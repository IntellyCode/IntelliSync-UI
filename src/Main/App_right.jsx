import FullBox from "./ReusableComponents/FullBox";
import Header from "./Header";
import Divider from "@mui/material/Divider";
export default function AppRight({ handleDrawer}) {

    return (
        <FullBox direction="column">
            <Header handleDrawer={handleDrawer} />
            <Divider variant="fullWidth" />
        </FullBox>
    )

}