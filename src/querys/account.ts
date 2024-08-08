import Bomb from "@/config/Bomb";

export const getAccounts = () => {
  const query = Bomb.Query("accounts");
  query.find().then((res) => {
    console.log(res);
  });
};

export const addAccount = async (
  multiAddress: string,
  name: string,
  pubkeys: Array<string>,
  num: number,
) => {
  const query = Bomb.Query("accounts");
  query.set("md", multiAddress);
  query.set("num", num as any);
  query.set("name", name);
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

export const findAccount = async (multiAddress: string) => {
  const query = Bomb.Query("accounts");
  query.equalTo("md", "==", multiAddress);
  return new Promise((resolve, reject) => {
    query
      .count()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAccountList = async (pubKey: string) => {
  const query = Bomb.Query("accounts");
  query.containedIn("pubs", [pubKey]);
  return new Promise((resolve, reject) => {
    query
      .find()
      .then((res: any) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
