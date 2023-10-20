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
import { Switch, Route } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState();
  useEffect(() => {
    async function loadDecks() {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    }

    loadDecks();
  }, [decks]);

  const deleteDeckWithId = (deckId) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId);
      setDecks((currentDecks) =>
        currentDecks.filter(
          (ignored, index) => currentDecks[index].id !== deckId
        )
      );
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
              <HomeScreen decks={decks} deleteDeckWithId={deleteDeckWithId} />
            </Route>
            <Route path="/decks/new">
              <NewDeck decks={decks} setDecks={setDecks} />
            </Route>
            <Route exact path="/decks/:deckId">
              <DeckView
                decks={decks}
                setDecks={setDecks}
                deleteDeckWithId={deleteDeckWithId}
              />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck decks={decks} setDecks={setDecks} />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard decks={decks} setDecks={setDecks} />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard decks={decks} />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <DeckStudy decks={decks} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
  return "Loading...";
}

export default Layout;
