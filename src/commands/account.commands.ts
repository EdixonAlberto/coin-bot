import { commandsList } from '../enumerations';
import BotResponse from '../modules/BotResponse';
import DataForRequest from '../modules/DataForRequest';
import { getAccount } from '../routes';
import Utils from '../modules/Utils';

const DEFAULT_ASSET: TAsset = config.defaultAsset;
const DECIMAL_QTY_FIAT: number = config.decimalQty.fiat;
const DEFAULT_FREE: number = 0.001;

export const balance = async (content: TContent, response: BotResponse): Promise<any> => {
  if (content.command === commandsList.balance) {
    const asset = (content.params[0] || DEFAULT_ASSET).toUpperCase() as TAsset | 'LIST';

    try {
      const dataRequest: TDataRequest = await DataForRequest.prepare();
      const account: TResponses['account'] = await getAccount(dataRequest);

      if (asset === 'LIST') {
        const balancesList: Array<TBalance> = account.balances.filter(
          (balance: TBalance) => balance.free >= DEFAULT_FREE
        );
        let container: number = 0;

        if (balancesList.length > 0) {
          const tableBalances: TTable = balancesList.map((balance: TBalance) => {
            const free = Utils.Float.convert(balance.free, DECIMAL_QTY_FIAT);
            const locked = Utils.Float.convert(balance.locked, DECIMAL_QTY_FIAT);
            container += Number(free) + Number(locked);

            return {
              title: balance.asset,
              content: `
                free: ${free} $
                locked: ${locked} $
              `
            };
          });

          const patrimonio = Utils.Float.convert(container, DECIMAL_QTY_FIAT);

          response.embeded({
            header: 'SALDO',
            title: 'Lista de activos con saldo en tu cuenta',
            detail: tableBalances,
            footer: `El saldo de todos tus activos suma **${patrimonio} $**`
          });
        } else response.general(`No hay activos con saldo > ${DEFAULT_FREE} $`);
      } else {
        const balance = account.balances.find(
          (balance: TBalance) => balance.asset === asset
        );

        if (balance) {
          const free = Utils.Float.convert(balance.free, DECIMAL_QTY_FIAT);
          const locked = Utils.Float.convert(balance.locked, DECIMAL_QTY_FIAT);

          response.general(`
            **Saldo del activo: ${asset}**
            free: ${free} $
            locked: ${locked} $
          `);
        } else {
        }
      }
    } catch (error) {
      console.error(`>> ERROR-${content.command.toUpperCase()} -> ${error}`);
    }
  }
};
