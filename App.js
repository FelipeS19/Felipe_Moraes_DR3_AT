import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicial from './src/Pages/inicial';
import Login from './src/Pages/Login';
import Register from './src/Pages/Register';
import Perfil from './src/Pages/Perfil';
import Endereco from './src/Pages/Endereco';
import AdicionarEndereco from './src/Pages/AdicionarEndereco';
import Dashboard from './src/Pages/Dashboard';
import AddItem from './src/Pages/Cadastro';
import Navbar from './src/Components/AppBarComponent';
import Search from './src/Pages/Search';
import Header from './src/Components/Header';
import Telacat from './src/Pages/Telacat';
import Telacart from './src/Pages/Telacart';
import Telafavorit from './src/Pages/Telafavorit';
import Itemdetails from './src/Pages/Itemdatails';
import { CartProvider } from './src/Context/Cartcontext';
import { FavoritesProvider } from './src/Context/FavoritesContext';
import { AuthProvider, useAuth } from './src/Context/Authcontext';
import * as Font from 'expo-font';
import Loading from './src/Components/Loading';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Boston-Angel-Regular': require('./assets/fonts/Boston-Angel-Regular.ttf'),
      'Literata-Regular': require('./assets/fonts/Literata-Regular.ttf'),
      'Luciole-Regular': require('./assets/fonts/Luciole-Regular.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <AppNavigator fontsLoaded={fontsLoaded} />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

const AppNavigator = ({ fontsLoaded }) => {
  const { user, loading } = useAuth();

  if (loading || !fontsLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Stack.Navigator initialRouteName={user ? "Dashboard" : "Inicial"}>
        <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Endereco"
          component={Endereco}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdicionarEndereco"
          component={WrappedScreen(AdicionarEndereco)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={WrappedScreen(Dashboard)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddItem"
          component={WrappedScreen(AddItem)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categoria"
          component={Telacat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Carrinho"
          component={Telacart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detalhes"
          component={Itemdetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favoritos"
          component={Telafavorit}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Navbar />
    </View>
  );
};

const WrappedScreen = (Component) => (props) => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollContainer}>
    <Component {...props} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
    backgroundColor: '#fff',

  },
});

export default App;
