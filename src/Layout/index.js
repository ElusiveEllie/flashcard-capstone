import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import HomeScreen from "./HomeScreen";
import NewDeck from "./NewDeck";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { listDecks } from "../utils/api";
import { Switch, Route, } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState();
  // Load in decks to state to pass into some pages
  useEffect(() => {
    async function loadDecks() {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    }

    loadDecks();
  }, []);

  // Functionality for deleting deck, gets passed into deck view
  async function deleteDeckWithId (deckId, url, history) {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      setDecks((currentDecks) =>
        currentDecks.filter(
          (ignored, index) => currentDecks[index].id !== deckId
        )
      );
      if (url !== "/") {
        history.push("/");
      }
    }
  };

  if (decks) {
    return (
      <>
        <Header />
        <div className="container">
          {/* TODO: Implement the screen starting here */}
          <Switch>
            <Route exact path="/">
              <HomeScreen decks={decks} setDecks={setDecks} deleteDeckWithId={deleteDeckWithId} />
            </Route>
            <Route path="/decks/new">
              <NewDeck decks={decks} setDecks={setDecks} />
            </Route>
            <Route exact path="/decks/:deckId">
              <DeckView decks={decks} setDecks={setDecks} deleteDeckWithId={deleteDeckWithId} />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck decks={decks} setDecks={setDecks} />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <DeckStudy />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
  // Set certain pages to display "Loading..." while waiting on decks to load, but other pages can be returned as is since they make their own API call
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            Loading...
          </Route>
          <Route path="/decks/new">Loading...</Route>
          <Route exact path="/decks/:deckId">
            Loading...
          </Route>
          <Route path="/decks/:deckId/edit">Loading...</Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <DeckStudy />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
