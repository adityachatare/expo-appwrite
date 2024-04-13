import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import {Client,Account,ID} from "react-native-appwrite";


let client;
let account;

client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("661a2f24cdb3beb9295a")
  .setPlatform("com.adityachatare.expoappwrite")

account = new Account(client)

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [userDetails, setUserDetails] = useState(null)

  //create a new appwrite account

  async function createAccount(){
    await account.create(ID.unique(), email,password,name)
    console.log("Sucessfully created account")
  }

  //Sign in with email and password

  async function signIn(){
    await account.createEmailSession(email,password)
    setUserDetails(await account.get()) //DO NOT USE THIS
    console.log(userDetails)
  }

  //SignOut

  async function signOut(){
    await account.deleteSessions()
    setUserDetails(null)
    console.log("User logged out sucessfully")
  }
  return (
    <View style={styles.container}>
     <View>
      <TextInput style={{height:40, borderColor:'gray',borderWidth:1,margin:10}} onChangeText={(text)=>setEmail(text)} placeholder='email' value={email}/>
      <TextInput style={{height:40, borderColor:'gray',borderWidth:1,margin:10}} onChangeText={(text)=>setPassword(text)} placeholder='password' value={password}/>
      <TextInput style={{height:40, borderColor:'gray',borderWidth:1,margin:10}} onChangeText={(text)=>setName(text)} placeholder='name' value={name}/>
      <Button title="SignIn" onPress={signIn}/>
      <Button title="SignOut" onPress={signOut}/>
      <Button title="Create Account" onPress={createAccount}/>
     </View>
     <View>
      <Text> Account ID : {userDetails?userDetails.$id:'null'}</Text>
     </View>
     <View>
      <Text> Email : {email}</Text>
     </View>
     <View>
      <Text> Password : {password}</Text>
     </View>
     <View>
      <Text> Name : {name}</Text>
     </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
