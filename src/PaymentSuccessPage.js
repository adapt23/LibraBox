import React from 'react';

const PaymentSuccessPage = () => {
  const invoice = JSON.parse(localStorage.getItem('lastInvoice'));

  return (
    <div style={{ backgroundImage: "url('/background libra box.png')" }} className="vh-100">
      <div className="container pt-5">
        <div className="card p-4">
          <h2 className="text-success">✅ Paiement Réussi !</h2>
          <div className="mt-4">
            <h4>Facture #{invoice?.transactionId?.slice(0, 8)}</h4>
            <p>Date : {new Date(invoice?.date).toLocaleDateString()}</p>
            <p>Montant total : {invoice?.amount?.toFixed(2)}€</p>
            <a href="/" className="btn btn-primary">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; // AJOUTEZ CETTE LIGNE