import snap from "./init";

export async function createTransaction(params: any, callback: Function) {
  snap
    .createTransaction(params)
    .then((transaction: { token: string; redirect_url: string }) => {
      callback(transaction);
    });
}

export async function getTransaction(token: string, callback: Function) {
  snap.transaction.status(token).then((res: any) => {
    callback(res);
  });
}
