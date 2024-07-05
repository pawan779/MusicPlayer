import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import TrackListItem from "@/src/components/TrackListItem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery($genres: String!) {
    recommendations(seed_genres: $genres) {
      tracks {
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

export default function TabOneScreen() {
  const { data, loading, error } = useQuery(query, {
    variables: { genres: "pop" },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error! {error.message}</Text>;

  const tracks = data?.recommendations?.tracks || [];
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 70 }}
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
