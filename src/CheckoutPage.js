import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CheckoutPage.css';

const CLIENT_ID = "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R";

const CheckoutPage = () => {
  // États
  const [cart, setCart] = useState([]);
  const [subscriptionType, setSubscriptionType] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Récupération du panier
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
      } catch (err) {
        setError("Erreur de lecture du panier");
      }
    };
    loadCart();
  }, []);

  // Calcul des totaux
  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const subscriptionPrice = subscriptionType === 'premium' ? 9.99 : 4.99;
  const finalTotal = (total + subscriptionPrice).toFixed(2);

  // Gestion PayPal
  useEffect(() => {
    let isMounted = true;
    let paypalButtons;
    let script;

    const initPayPal = () => {
      if (document.querySelector('#paypal-script')) return;

      script = document.createElement('script');
      script.id = 'paypal-script';
      script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=EUR`;
      script.async = true;
      script.defer = true;
      script.setAttribute('data-nonce', 'paypal-nonce');

      script.onload = () => {
        if (!isMounted || !window.paypal) {
          console.error('PayPal non disponible');
          return;
        }

        try {
          paypalButtons = window.paypal.Buttons({
            style: { 
              color: 'blue', 
              shape: 'rect', 
              height: 48,
              label: 'checkout'
            },
            createOrder: (_, actions) => actions.order.create({
              purchase_units: [{
                amount: { 
                  value: finalTotal, 
                  currency_code: 'EUR' 
                }
              }]
            }),
            onApprove: (_, actions) => actions.order.capture()
              .then(details => {
                handlePaymentSuccess(details);
                navigate('/payment-success');
              })
              .catch(err => {
                setError("Échec du traitement du paiement");
                console.error('Erreur PayPal:', err);
              }),
            onError: (err) => {
              setError("Erreur système PayPal");
              console.error('Erreur PayPal:', err);
            }
          });

          if (isMounted) {
            paypalButtons.render('#paypal-button-container');
            setPaypalLoaded(true);
          }
        } catch (err) {
          setError("Configuration PayPal invalide");
          console.error('Erreur initialisation:', err);
        }
      };

      script.onerror = () => {
        setError("Service PayPal indisponible");
        console.error('Échec chargement script');
      };

      document.body.appendChild(script);
    };

    if (paymentMethod === 'paypal' && !window.paypal) initPayPal();

    return () => {
      isMounted = false;
      if (paypalButtons) {
        paypalButtons.close();
        setPaypalLoaded(false);
      }
      if (script) {
        document.body.removeChild(script);
      }
      delete window.paypal;
    };
  }, [paymentMethod, finalTotal, navigate]);

  // Gestion paiement carte
  const handleCardPayment = (e) => {
    e.preventDefault();
    if (validateCard()) {
      handlePaymentSuccess({ 
        id: `CARD-${Date.now()}`,
        status: 'COMPLETED' 
      });
      navigate('/payment-success');
    }
  };

  // Validation carte
  const validateCard = () => {
    const errors = [];
    const { number, expiry, cvc, name } = cardDetails;

    if (!number.match(/^\d{4} \d{4} \d{4} \d{4}$/)) errors.push("Numéro de carte invalide");
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) errors.push("Date d'expiration invalide");
    if (!cvc.match(/^\d{3}$/)) errors.push("Code CVC invalide");
    if (name.trim().length < 3) errors.push("Nom sur la carte requis");

    if (errors.length > 0) {
      setError(errors.join(", "));
      return false;
    }
    return true;
  };

  // Formatage des inputs
  const formatInput = (value, type) => {
    switch(type) {
      case 'number':
        return value.replace(/\D/g, '')
          .slice(0, 16)
          .replace(/(\d{4})(?=\d)/g, '$1 ');
      case 'expiry':
        return value.replace(/\D/g, '')
          .slice(0, 4)
          .replace(/(\d{2})(\d)/, '$1/$2');
      case 'cvc':
        return value.slice(0, 3);
      default:
        return value;
    }
  };

  // Gestion réussite paiement
  const handlePaymentSuccess = (details) => {
    const invoice = {
      date: new Date().toISOString(),
      amount: parseFloat(finalTotal), 
      items: [...cart, { 
        title: `Abonnement ${subscriptionType}`, 
        price: subscriptionPrice 
      }],
      transactionId: details.id,
      method: paymentMethod
    };
    
    localStorage.setItem('lastInvoice', JSON.stringify(invoice));
    localStorage.removeItem('cart');
  };

  return (
    <div 
      className="checkout-container vh-100" 
      style={{
        backgroundImage: "url('/background libra box.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem'
      }}
    >
      <div className="container py-4">
        {/* Gestion des erreurs */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            ⚠️ {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
            />
            {paymentMethod === 'paypal' && (
              <div className="mt-2 small">
                <strong>Test PayPal :</strong><br/>
                Email: sb-43j7qz29605257@personal.example.com<br/>
                Mot de passe: X6%W0%rG
              </div>
            )}
          </div>
        )}

        {/* En-tête */}
        <h1 className="mb-4 text-white bg-dark p-3 rounded-3">
          🛒 Finalisation de commande
        </h1>

        {/* Récapitulatif */}
        <div className="card mb-4 shadow">
          <div className="card-body">
            <h3 className="card-title mb-3">📦 Votre panier</h3>
            <div className="list-group">
              {cart.map((item, index) => (
                <div 
                  key={index} 
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{item.title}</span>
                  <span className="badge bg-primary rounded-pill">
                    {item.price.toFixed(2)}€
                  </span>
                </div>
              ))}
              <div className="list-group-item bg-light d-flex justify-content-between">
                <strong>Abonnement {subscriptionType}</strong>
                <strong>{subscriptionPrice.toFixed(2)}€</strong>
              </div>
            </div>
            <div className="mt-3 h4 text-end text-success">
  Total : <strong>{(total + subscriptionPrice).toFixed(2)}€</strong>
</div>
          </div>
        </div>

        {/* Sélection méthode de paiement */}
        <div className="card mb-4 shadow">
          <div className="card-body">
            <h3 className="card-title mb-4">💳 Méthode de paiement</h3>
            <div className="vstack gap-3">
              <div className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                <input
                  type="radio"
                  id="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <label htmlFor="paypal">
                  <img 
                    src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                    alt="PayPal" 
                    className="me-2"
                    style={{ width: '40px' }}
                  />
                  Paiement sécurisé PayPal
                </label>
              </div>
              
              <div className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  id="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <label htmlFor="card">
                  <i className="bi bi-credit-card fs-4 me-2"></i>
                  Carte bancaire
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section PayPal */}
        {paymentMethod === 'paypal' && (
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <img 
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                  alt="PayPal" 
                  style={{ width: '50px' }}
                />
                <div className="ms-3">
                  <h4>Paiement sécurisé</h4>
                  <small className="text-muted">Transactions cryptées - Mode démo</small>
                </div>
              </div>
              
              {paypalLoaded ? (
                <div id="paypal-button-container"></div>
              ) : (
                <div className="alert alert-info">
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Initialisation du service PayPal...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section Carte bancaire */}
        {paymentMethod === 'card' && (
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleCardPayment}>
                <div className="mb-3">
                  <label className="form-label">Numéro de carte</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="4242 4242 4242 4242"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({
                      ...cardDetails,
                      number: formatInput(e.target.value, 'number')
                    })}
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Date d'expiration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/AA"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({
                        ...cardDetails,
                        expiry: formatInput(e.target.value, 'expiry')
                      })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Code CVC</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({
                        ...cardDetails,
                        cvc: formatInput(e.target.value, 'cvc')
                      })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Nom sur la carte</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="JEAN DUPONT"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({
                      ...cardDetails,
                      name: e.target.value.toUpperCase()
                    })}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                  Payer {finalTotal}€
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;