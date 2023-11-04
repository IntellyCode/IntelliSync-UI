import { Container, Accordion, AccordionSummary, Typography, AccordionDetails, Stack, Divider, FormControlLabel, Checkbox } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SquareIcon from "@mui/icons-material/Square";
import CheckIcon from "@mui/icons-material/Check";
import React, { forwardRef, useEffect, useState } from "react";

const frame = { height: 'auto', py: 4, px: 2 };
const summary = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const typographyStyle = { textAlign: "left", width: 'fit-content', p: 2,color:"primary.contrastText",fontSize:"17px" };

const Filters =() =>{



    const [checkedFilters, setCheckedFilers] = useState([1, 2, 3, 4]);

    const handleFilersToggle = (id) => {
        let updated = checkedFilters;
        if (updated.includes(id)) {
            updated = updated.filter((FilersId) => FilersId !== id);
        } else {
            updated = [...updated, id];
        }
        if(updated.includes(1) && updated.includes(2) && updated.includes(3) && updated.includes(4)){
            updated=[1,2,3,4,5];
        } else if(updated.includes(5)){
            updated.pop(5);
        }
        setCheckedFilers(updated);

    };


    const toggleAllFilters = (id) => {
        if (checkedFilters.includes(5)) {
            setCheckedFilers([]);
        } else {
            setCheckedFilers([1, 2, 3, 4, 5]);
        }

    }
    useEffect(() => {
        if (checkedFilters.every(item => [1, 2, 3, 4].includes(item))) {
            setCheckedFilers([1, 2, 3, 4, 5]);
        }
    }, [])

    return (
        <Container sx={frame} >
            <Accordion disableGutters  >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ ...summary, p: 0 }}>
                    <Typography sx={typographyStyle}>Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={0.5} direction="row" sx={{ mb: 3 }} justifyContent={"space-between"}>
                        <FilterEntry name={"All"} id={5} checked={checkedFilters.includes(5)} onToggle={toggleAllFilters} special={true}/>
                    </Stack>
                    <Divider />
                    <Stack spacing={0.5}>
                        <FilterEntry name={"Upcoming events"} id={1} checked={checkedFilters.includes(1)} onToggle={handleFilersToggle} />
                        <FilterEntry name={"Past events"} id={2} checked={checkedFilters.includes(2)} onToggle={handleFilersToggle} />
                        <FilterEntry name={"Events before"} id={3} checked={checkedFilters.includes(3)} onToggle={handleFilersToggle} />
                        <FilterEntry name={"Events after"} id={4} checked={checkedFilters.includes(4)} onToggle={handleFilersToggle} />
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Container>
    )

}

function FilterEntry({ name, id, checked, onToggle,special }) {
    const commonStyle = {
        color: checked ? `${!special?"secondary.contrastText":"success.main"}` : "checkbox.gray",
        backgroundColor: checked ? `${!special?"secondary.contrastText":"success.main"}` : "checkbox.gray",
        fontSize: "large",
        borderRadius: "4px",
        boxShadow: `inset 0 0 3px rgba(56,45,56,0.86)`,
        border: "rgb(0,0,0,0.2) solid 1px",
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    icon={<SquareIcon sx={{ ...commonStyle }} />}
                    checkedIcon={<CheckIcon sx={{ ...commonStyle, color: "white" }} />}
                    checked={checked}
                    onChange={() => onToggle(id)}
                />
            }
            label={name}
        />

    );
}

export default Filters;