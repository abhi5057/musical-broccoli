import React, {useState} from "react"
import "./DebitCard.css"
import cards from "../../cards.json"
export const DebitCard = () => {
	const [selectedCard, selectCard] = useState(null)
	const [isEncrypted, setEncrypted] = useState(true)
	const [displayedDetails, showOrHideCardDetails] = useState({
		bank: selectedCard?.bank,
		number: selectedCard?.number,
		name: selectedCard?.name,
		expiry: selectedCard?.expiry,
		cvv: selectedCard?.cvv
	})

	const showCardInList = (card, index) => {
		const onCardClick = () => {
			setEncrypted(true)
			selectCard(card)
		}
		return (
			<div className="list-card" data-testid={`list-card-${index}`} key={index} onClick={onCardClick}>
				<p className="list-card-title">
					{`Card ${index}`}
				</p>
			</div>
		)
	}

	const toggleCardDetails = () => {
		setEncrypted(!isEncrypted);
		let bank = selectedCard.bank
		let expiry = isEncrypted ? "XX/XX" : selectedCard.expiry
		let cvv = isEncrypted ? "XXX" : selectedCard.cvv
		let number = !isEncrypted ? selectedCard.number : `${selectedCard.number.slice(0,3)} XXXX XXXX XXXX`
		let noOfSpacesInName = (selectedCard.name.filter(" ")).length
		let name = selectedCard.name
		if(isEncrypted) {
			name = name.slice(0,3)
			for(let i = 0; i< noOfSpacesInName; i++) {
				name = `${name} XXXX`
			}
		} 
		let updatedDetails = {
			bank,
			number,
			name,
			expiry,
			cvv
		}
		showOrHideCardDetails(updatedDetails)
	}

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div className="card outlined" style={{ width: '1000px' }}>
					{	selectedCard &&
						<div data-testid="debit-card">
							<h3 style={{ textAlign: 'center' }}>Card Details</h3>
							<br />
							<div className="debit-card-body" data-testid="debit-card-body" onClick={toggleCardDetails}>
								<p className="debit-card-bank" data-testid="debit-card-bank-name">{displayedDetails.bank}</p>
								<p className="debit-card-no" data-testid="debit-card-no">{displayedDetails.number}</p>
								<br />
								<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
								<p>
									<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{displayedDetails.name}</span>
									<span className="debit-card-date" data-testid="debit-card-expiry-date">{displayedDetails.expiry}</span>
									<span className="debit-card-cvv" data-testid="debit-card-cvv">{displayedDetails.cvv}</span></p>
							</div>
						</div>
					}
				<div>
					<h3 style={{ textAlign: "center" }}>Cards List</h3>
					<div className="debit-card-list" data-testid="debit-card-list">

						{cards.map((card, index) => showCardInList(card, index))}
						
						{/* <div className="list-card" data-testid="list-card-0">
							<p className="list-card-title">Card 1</p>
						</div>
						
						
						<div className="list-card" data-testid="list-card-2"><p className="list-card-title">Card 2</p></div>
						<div className="list-card" data-testid="list-card-3"><p className="list-card-title">Card 3</p></div>
						<div className="list-card" data-testid="list-card-4"><p className="list-card-title">Card 4</p></div> */}



					</div>
				</div>
			</div>
		</div>
	)
}