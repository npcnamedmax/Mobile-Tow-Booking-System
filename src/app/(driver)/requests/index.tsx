import { FlatList } from "react-native";
import { requests } from "@assets/data/requests";
import RequestItem from "@/components/req/RequestItem";
import { type TowReq } from "@/types";

export default function Index() {
  return (
    <FlatList
      data={requests}
      keyExtractor={(item: TowReq) => item.id} // Use the unique 'id' from TowReq
      renderItem={({ item }) => (
        <RequestItem item={item} />
      )} // Close renderItem correctly
    />
  );
}
