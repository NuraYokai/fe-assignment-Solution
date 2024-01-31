import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MovieDetailsView,
  ScrollViewContainer,
  ViewMovies,
  ViewSearchSort,
} from "../../components/view.component";
import { SortPicker } from "../../components/picker.component";
import { WindowContext } from "../../services/window/window.context";
import { SortButton } from "../../components/button.component";
import { SearchTextInput } from "../../components/text-input.component";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AdvancedTitleSearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [sortMovies, setSortMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("episode");

  const windowDimensions = useContext(WindowContext);

  const fetchMovies = useCallback(async (controller) => {
    try {
      const response = await fetch("https://swapi.dev/api/films/?format=json");
      const data = await response.json();
      setMovies(data.results);
      setSortMovies(data.results);
    } catch (error) {
      console.error("Error fetching Star Wars movies:", error);
    }
  }, []);

  const controller = useRef(new AbortController());

  useEffect(() => {
    controller.current.abort();
    controller.current = new AbortController();
    fetchMovies(setMovies, setSortMovies, controller.current);
  }, [fetchMovies]);

  const handleSort = () => {
    let sortedMovies = [...sortMovies];
    if (sortType === "episode") {
      sortedMovies.sort((a, b) => a.episode_id - b.episode_id);
    } else if (sortType === "year") {
      sortedMovies.sort(
        (a, b) => parseInt(a.release_date, 10) - parseInt(b.release_date, 10)
      );
    }
    setSortMovies(sortedMovies);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setSortMovies(filteredMovies);
  };

  return (
    <>
      <ScrollViewContainer>
        <ViewMovies width={windowDimensions.width}>
          <ViewSearchSort>
            <SortPicker
              selectedValue={sortType}
              onValueChange={(itemValue, itemIndex) => setSortType(itemValue)}
              width={windowDimensions.width}
            >
              <SortPicker.Item label="EPISODE" value="episode" />
              <SortPicker.Item label="YEAR" value="year" />
            </SortPicker>
            <SortButton title="Sort" onPress={() => handleSort()} />
            <SearchTextInput
              onChangeText={handleSearchTextChange}
              placeholder="Search Title"
            />
          </ViewSearchSort>

          {sortMovies.length === 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={sortMovies}
              keyExtractor={(item) => item.episode_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.episode_id}
                  onPress={() => handleMovieClick(item)}
                >
                  <View className="movie-info">
                    <Text>{`EPISODE ${item.episode_id}`}</Text>
                    <Text>{item.title}</Text>
                    <Text>{`Year ${item.release_date.substring(0, 4)}`}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </ViewMovies>
        <MovieDetailsView>
          {selectedMovie ? (
            <>
              <Text style={{ fontSize: 20 }}>{selectedMovie.title}</Text>
              <Text>{`EPISODE ${selectedMovie.episode_id}`}</Text>
              <Text>{selectedMovie.opening_crawl}</Text>
            </>
          ) : (
            <View style={{ padding: 10 }}>
              <Text>No Movie selected</Text>
            </View>
          )}
        </MovieDetailsView>
      </ScrollViewContainer>
    </>
  );
};

export default AdvancedTitleSearchScreen;
