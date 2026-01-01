/* Plugins. */
import { useEffect } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Stack } from "expo-router";

/* Helpers. */
import { initialVerification } from "../src/ActionCreators/initialVerification";
import { Loader } from "../src/Components/Loader/Loader";

function LifeSwapIndex(props) {

    const { initialVerification, userDetails } = props;

    /* Check the user has already signed in or not. */
    useEffect(() => { initialVerification() }, []);

    if (userDetails?.loader) return <Loader />

    return (
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#fff" } }}>
            {(userDetails?.hasOwnProperty('error')) ? (<Stack.Screen name="(auth)" />) : (<Stack.Screen name="(tabs)" />)}
        </Stack>
    );
};

const mapState = state => ({
    userDetails: state?.userDetails
});

const mapDispatch = {
    initialVerification
};

export default connect(mapState, mapDispatch)(LifeSwapIndex);