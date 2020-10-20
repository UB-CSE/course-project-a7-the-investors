import * as React from "react";
import {AsyncStorage} from 'react-native';
import Parse from 'parse/react-native.js';
import {Text, View, StyleSheet, Button, Image, Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Component} from "react";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";


const widthfoot = Dimensions.get('window').width;

export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    async createAccount() {
        Parse.setAsyncStorage(AsyncStorage);
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz', // This is your Application ID
            '97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4' // This is your Javascript key
        );

        const user = new Parse.User()
        // const user = new User();

        user.set("username", this.state.username);
        user.set("email", this.state.email);
        user.set("password", this.state.password);
        let successfulLogin = false;
        await user.signUp().then((user) => {
            if (typeof document !== 'undefined') document.write(`User signed up: ${JSON.stringify(user)}`);
            console.log('User signed up', user);
            successfulLogin = true;
        }).catch(error => {
            if (typeof document !== 'undefined') document.write(`Error while signing up user: ${JSON.stringify(error)}`);
            console.error('Error while signing up user', error);
        });

        if (successfulLogin) {
            let sessionToken;
            await Parse.User.logIn(this.state.email, this.state.password).then((user) => {
                // Do stuff after successful login
                if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
                //console.log("TOKEN:   "  + user.get('sessionToken'))
                this.props.changeLoginStatus();
                sessionToken = user.get('sessionToken');

            }).catch(error => {
                if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
                console.error('Error while logging in user', error);
            })


            await SecureStore.setItemAsync('sessionToken', sessionToken).then(() => {
                console.log("SET ITEM")
            })

            SecureStore.getItemAsync('sessionToken').then(token => {
                console.log("THIS IS THE TOKEN" + token);
            });
        }


    }

    render() {
        return (
            <KeyboardAwareScrollView
            style={{ backgroundColor: 'white' }}
            resetScrollToCoords={{ x:0, y:0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}>
                <View style={styles.header}>
                    <Text style={styles.welcomeWords}>Register for new account! </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.setInfo}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your username"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({username: text})}
                    />

                    <Text style={styles.setInfo}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your email"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({email: text})}
                    />

                    <Text style={styles.setInfo}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Your password"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({password: text})}
                    />

                    <Text style={styles.setInfo}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Your password"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                    />

                    <TouchableOpacity style={styles.touchableButton} onPress={() => this.createAccount()}>
                        <Text style={styles.touchableText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30
    },
    welcomeWords: {
        color: '#403f42',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: "center",
    },
    footer: {
        backgroundColor: "#889b73",
        flex: 4,
        width: widthfoot,
        paddingVertical: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },    
    input: {
        borderWidth: 3,
        borderColor: "#EAFAF1",
        height: 40,
        padding: 10,
        marginHorizontal: 20,
        color: '#05375a',
        borderRadius: 5,
    },
    login: {
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        fontSize: 14,
    },
    setInfo: {
        color: '#05375a',
        marginHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 20,
    },
    touchableButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        elevation: 8,
        borderRadius: 10,
        padding: 12,
        marginLeft: widthfoot / 2,
        marginRight: 20,
        marginTop: 20,
    },
    touchableText: {
        fontSize: 18,
        color: "#008000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});
