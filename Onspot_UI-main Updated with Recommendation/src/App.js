import logo from "./logo.svg";
import "./App.css";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Events from "./pages/Events";

// import PartyWear from "./pages/PartyWear";
// import EidWear from "./pages/MenEidWear";
// import GentsKurta from "./pages/GentsKurta";
// import WomenParty from "./pages/WomenParty";
// import MenFormal from "./pages/MenFormal";
// import Bride from "./pages/Bride";

import preloved from "./pages/Preloved";
import Wishlist from "./pages/Wishlist";
import ImageSearch from "./pages/ImageSearch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import products from "./pages/Products";
import Wardrobe from "./pages/Wardrobe";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Favourite from "./pages/Favourite"


import Recommendation from "./pages/recommendation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Recommended from "./pages/Recommended";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/favourite" component={Favourite} />
          <Route path="/recommend" component={Recommended} />
          <Route path="/preloved" component={preloved} />
          <Route path="/events" component={Events} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/image-search" component={ImageSearch} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/products" component={products} />
          <Route path="/wardrobe" component={Wardrobe} />
          <Route path="/Category" component={Category} />
          <Route path="/Recommendation" component={Recommendation} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
