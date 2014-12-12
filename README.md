dsc-gtm-beacons
===============

## Goal

To migrate from the existing beacon system using DSC cms and inline templates, to an ember backed beacon system using
the dsc-ember-gtm service to provide beacon data directly to Google Tag Manager.

Instead of passing data to vendor analytics services directly the dsc-ember-gtm service passes all data to gtm,
and gtm is then responsible for sending data to the vendor services. This centralizes management of vendor analytics in gtm
and allows the dsc ember application to focus specifically on delivering analytics payloads to gtm.

## Contents

* `angular-checkout-success.html` -  the existing "flattened" checkout success page
* `cms-beacons.html` - beacon scripts embedded into ^^^ by the cms
* `ember-gtm.js` - new ember gtm impelementation ( for reference )

## Required Features

* GTM needs to support dynamic pixels based on data passed through the dataLayer
* GTM needs to support dynamic pixel rending based on arbitrary vars passed through dataLayer
* GTM need to support variables in embedded script that draw from data passed through the dataLayer

## Checkout Success Page

### Vendors

* Facebook ( Conversion Data - subscription & funnel products )
* Yahoo ( Conversion Data - subscription )
* Retention Science	( Conversion Data - subscription )
* Adwords ( Conversion Data - subscription )
* Bing ( Conversion Data - subscription )
* AOL ( Conversion Data - subscription )
* TwoNil ( Conversion Data - subscription )
* Convertro	( Conversion Data - subscription & funnel products )
* Twitter ( Conversion Data - subscription )
* Pinterest	( Conversion Data - subscription )
* Gawker ( Conversion Data - subscription )
* Pepperjam	( Conversion Data - subscription )
* Friendbuy	( Conversion Data - subscription )
* Ampush ( Conversion Data - subscription )

