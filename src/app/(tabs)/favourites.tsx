import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { tracks } from "@/assets/data/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getFavourite($userId: String!) {
    favoritesByUserid(userid: $userId) {
      id
      trackid
      userid
      track {
        id
        name
        preview_url
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            height
            url
            width
          }
        }
      }
    }
  }
`;

export default function FavouritesScreen() {
  const { data, loading, error } = useQuery(query, {
    variables: { userId: "1" },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error! {error.message}</Text>;
  const tracks = (data?.favoritesByUserid || []).map((fav) => fav.track);

  console.log(tracks);

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
