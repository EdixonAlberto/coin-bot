import BotResponse from '../modules/BotResponse';
import DataForRequest from '../modules/DataForRequest';
import { getAccount } from '../routes';
import Utils from '../modules/Utils';

/* CONFIG */
const DEFAULT_ASSET: TAsset = 'BTC';
const DECIMAL_QTY_FIAT: number = 2;
const DEFAULT_FREE: number = 0.001; // TODO: Esto debe venir desde las config dinamicas

export const balance = async (content: TContent, response: BotResponse): Promise<any> => {
  const asset = (content.params[0] || DEFAULT_ASSET).toUpperCase() as TAsset | 'LIST';

  try {
    const dataRequest: TDataRequest = await DataForRequest.prepare();
    const account: TResponses['account'] = await getAccount(dataRequest);

    if (asset === 'LIST') {
      // Show list the assets with balance and >= DEFAULT_FREE
      const balancesList: Array<TBalance> = account.balances.filter(
        (balance: TBalance) => balance.free >= DEFAULT_FREE
      );

      let patrimony: number = 0; // Accumulator the money

      // Creating table the balances
      if (balancesList.length > 0) {
        const balancesTable: TTable = balancesList.map((balance: TBalance) => {
          patrimony += Number(balance.free) + Number(balance.locked);

          const free = Utils.Float.convert(balance.free, DECIMAL_QTY_FIAT);
          const locked = Utils.Float.convert(balance.locked, DECIMAL_QTY_FIAT);

          // Adding columns in the table
          return {
            title: balance.asset,
            content: `free: ${free} $ \nlocked: ${locked} $`,
            fieldType: 'column'
          };
        });

        // Adding a last row in the table
        balancesTable.push({
          title: 'Saldo de todos tus activos',
          content: Utils.Float.convert(patrimony, DECIMAL_QTY_FIAT) + ' $',
          fieldType: 'row'
        });

        response.embeded({
          header: 'SALDO',
          title: 'Lista de activos con saldo',
          detail: balancesTable
        });
      } else response.general(`No hay activos con saldo > ${DEFAULT_FREE} $`);
    } else {
      // Show asset seleted
      const balance = account.balances.find(
        (balance: TBalance) => balance.asset === asset
      );

      if (balance) {
        const free = Utils.Float.convert(balance.free, DECIMAL_QTY_FIAT);
        const locked = Utils.Float.convert(balance.locked, DECIMAL_QTY_FIAT);

        response.embeded({
          header: 'SALDO',
          title: `Saldo del activo: ${asset}`,
          detail: `free: ${free} $ \nlocked: ${locked} $`
        });
      } else response.general(`No hay saldo ${asset}`);
    }
  } catch (error) {
    console.error('>> ERROR-ACCOUNT ->', error.response?.data);
  }
};
