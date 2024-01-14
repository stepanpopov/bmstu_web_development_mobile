import HomeScreen from "./screens/HomeScreen";
import {StatusBar, View} from "react-native";
import {Navigation} from "./screens/Navigation";
import { customAlphabet } from 'nanoid/non-secure'; 

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10); 


export default function App() {

    return (
        <Navigation />
    );
}

