import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

interface isFirstTimeProps {
    isLoading: boolean
    isFirstTime: boolean
}

export function useFirstTimeOpen(): isFirstTimeProps {
    const [isFirstTime, setIsFirstTime] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function checkFirstTimeOpen() {
            try {
                const hasOpened = await AsyncStorage.getItem("hasOpened");

                if (hasOpened == null) {
                    // first time 
                    setIsFirstTime(true);
                } else {
                    setIsFirstTime(false);
                }
            } catch (error) {
                console.log("error gettigs local first time", error);
            } finally {
                setIsLoading(false)
            }
        }

        checkFirstTimeOpen();
    }, [])
    
    return {
        isFirstTime,
        isLoading,
    }
}