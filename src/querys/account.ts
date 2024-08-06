import Bomb from "@/config/Bomb";

export const getAccounts = () => {
  const query = Bomb.Query("accounts");
  query.find().then((res) => {
    console.log(res);
  });
};

export const addAccount = (multiAddress: string, pubkeys: Array<string>) => {
  const query = Bomb.Query("accounts");
  query.set("md", multiAddress);
  query.add("pubs", pubkeys);
  query
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const findAccount =async (multiAddress: string) => {
  const query = Bomb.Query("accounts");
  query.equalTo("md", "==", multiAddress);
  query
    .count()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
