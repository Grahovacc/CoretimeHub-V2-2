// src/components/AccountSelector/index.tsx
import { useUnit } from 'effector-react';
import Identicon from '@polkadot/react-identicon';
import styles from './account.module.scss';
import Select from '../elements/Select';
import {
  $loadedAccounts,
  $selectedAccount,
  accountSelected,
  SELECTED_WALLET_KEY,
  SELECTED_ACCOUNT_KEY,
  walletSelected,
} from '@/wallet';
import { $accountIdentities } from '@/account/accountIdentity';

const AccountSelector = () => {
  const accounts = useUnit($loadedAccounts);
  const selectedAccount = useUnit($selectedAccount);
  const identities = useUnit($accountIdentities);

  const handleChange = (value: string | null) => {
    if (value === 'disconnect') {
      localStorage.removeItem(SELECTED_WALLET_KEY);
      localStorage.removeItem(SELECTED_ACCOUNT_KEY);
      walletSelected('');
      accountSelected('');
      return;
    }
    if (value) {
      accountSelected(value);
    }
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 4)}...${address.slice(-6)}`;
  };

  const options = accounts.map((account) => {
    const identityName = identities[account.address];
    const hasIdentity = !!identityName;
    const display = `${identityName || account.name || 'Unknown'}${hasIdentity ? ' ✅' : ''}`;

    return {
      key: account.address,
      value: account.address,
      label: `${display} (${formatAddress(account.address)})`,
      icon: (
        <div className={styles.icon}>
          <Identicon value={account.address} size={24} theme='polkadot' />
        </div>
      ),
    };
  });

  options.push({
    key: 'disconnect',
    value: 'disconnect',
    label: 'Disconnect',
    icon: <></>,
  });

  return (
    <div className={styles.selectWrapper}>
      <Select
        options={options}
        onChange={handleChange}
        placeholder='Select an account'
        selectedValue={selectedAccount?.address ?? null}
      />
    </div>
  );
};

export default AccountSelector;
