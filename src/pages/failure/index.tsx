import { XMarkIcon } from '@heroicons/react/24/outline';
import { TransactionInfo } from '../../components/TransactionInfo';
import { Box } from '../../components/Box';
import { BaseLayout } from '../../layouts';
import { EmailForm } from '../../components/EmailForm';
import { TelegramButton } from '../../components/buttons/TelegramButton';
import { FailureType } from '../../services/offrampingFlow';

const Cross = () => (
  <div className="flex items-center justify-center w-20 h-20 border-2 border-red-500 rounded-full">
    <XMarkIcon className="w-10 text-red-500" />
  </div>
);

interface FailurePageProps {
  finishOfframping: () => void;
  continueFailedFlow: () => void;
  transactionId: string | undefined;
  failure: FailureType;
}

export const FailurePage = ({ finishOfframping, continueFailedFlow, transactionId, failure }: FailurePageProps) => {
  console.log('Failure page');
  const main = (
    <main>
      <Box className="flex flex-col items-center justify-center mx-auto mt-12">
        <Cross />
        <h1 className="mt-6 text-2xl font-bold text-center text-red-500">Oops! Something went wrong</h1>
        {transactionId && <TransactionInfo transactionId={transactionId} />}
        {failure === 'recoverable' ? (
          <>
            <p className="mt-6 text-center">
              Unfortunately, your withdrawal request could not be processed in time. This could be due to a temporary
              problem such as bad internet connection.
            </p>
            <p>Either try to continue or start over.</p>
          </>
        )}
        {failure === 'recoverable' && (
          <button className="w-full mt-5 text-white bg-blue-700 btn rounded-xl" onClick={continueFailedFlow}>
            Continue
          </button>
        )}
        <button className="w-full mt-5 text-white bg-blue-700 btn rounded-xl" onClick={finishOfframping}>
          Try again
        </button>
        <div className="h-0.5 m-auto w-1/5 bg-pink-500 mt-8 mb-5" />
        <p className="text-center text-gray-400">In case you experience any issues, please copy this {transactionId && <TransactionInfo transactionId={transactionId} />} </p>
        <p className="text-center text-gray-400">Contact our support team at: We’re here to help!</p>
        <TelegramButton />
        <EmailForm transactionId={transactionId} />
      </Box>
    </main>
  );

  return <BaseLayout main={main} />;
};
