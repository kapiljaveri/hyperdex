import React from 'react';
import appContainer from 'containers/App';
import exchangeContainer from 'containers/Exchange';
import tradesContainer from 'containers/Trades';
import View from 'components/View';
import SwapList from 'components/SwapList';
import Link from 'components/Link';
import TabButton from 'components/TabButton';
import {translate} from '../../translate';
import './Swaps.scss';

const t = translate('exchange');

const getOpenOrders = () => exchangeContainer.state.swapHistory.filter(swap => swap.isActive);

const TabView = ({component}) => (
	<View component={component} activeView={exchangeContainer.state.activeSwapsView}/>
);

const OpenOrders = () => {
	const openOrders = getOpenOrders();

	return (
		<SwapList swaps={openOrders} showCancel/>
	);
};

const CurrentPairOpenOrders = () => {
	const {state} = exchangeContainer;

	const filteredData = getOpenOrders().filter(swap =>
		swap.baseCurrency === state.baseCurrency &&
		swap.quoteCurrency === state.quoteCurrency
	);

	return (
		<SwapList swaps={filteredData} showCancel/>
	);
};

const Swaps = () => {
	const {state} = exchangeContainer;
	const [openOrdersComponentName, currentPairOpenOrdersComponentName] = [OpenOrders.name, CurrentPairOpenOrders.name];

	return (
		<div className="Exchange--Swaps">
			<header>
				<h3>
					{t('swaps.title')}
					<Link
						className="history-button"
						onClick={() => {
							appContainer.setActiveView('Trades');
							tradesContainer.setActiveView('TradeHistory');
						}}
					>
						{t('swaps.historyButtonTitle')}
					</Link>
				</h3>
				<nav>
					<TabButton
						active={state.activeSwapsView === openOrdersComponentName}
						onClick={() => exchangeContainer.setActiveSwapsView(openOrdersComponentName)}
					>
						{t('swaps.all')}
					</TabButton>
					<TabButton
						active={state.activeSwapsView === currentPairOpenOrdersComponentName}
						onClick={() => exchangeContainer.setActiveSwapsView(currentPairOpenOrdersComponentName)}
					>
						{`${state.baseCurrency}/${state.quoteCurrency}`}
					</TabButton>
				</nav>
			</header>
			<main>
				<TabView component={OpenOrders}/>
				<TabView component={CurrentPairOpenOrders}/>
			</main>
		</div>
	);
};

export default Swaps;
