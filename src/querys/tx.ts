import Bomb from "@/config/Bomb";

export const generateRandomString = (length: number = 32) => {
  let randomString = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return randomString
}

export const getOrder = async (orderId: string) => {
  const query = Bomb.Query("pb");
  query.equalTo("orderid", "==", orderId);
  return new Promise((resolve, reject) => {
    query
    .find()
      .then((res:any) => {
        resolve(res);
      })
      .catch((err:any) => {
        reject(err);
      });
  });
};

export const getTxList = async (multiAddress: string) => {
  const query = Bomb.Query("pb");
  query.equalTo("md", "==", multiAddress);
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

export const addTx = async (
  multiAddress: string,
  psbtHex: string,
  pubkeys: Array<string>,
) => {
  const query = Bomb.Query("pb");
  query.set("orderid", generateRandomString(8));
  query.set("md", multiAddress);
  query.set("if", '0');
  query.set("lp", psbtHex);
  query.set("cp", psbtHex);
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


