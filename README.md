dsc-gtm-beacons
===============

## Goal

To migrate from the existing beacon system using DSC cms and inline templates, to an ember backed beacon system using
the dsc-ember-gtm service to provide beacon data directly to Google Tag Manager.

Instead of passing data to vendor analytics services directly the dsc-ember-gtm service passes all data to gtm,
and gtm is then responsible for sending data to the vendor services. This centralizes management of vendor analytics in gtm
and allows the dsc ember application to focus specifically on delivering analytics payloads to gtm.

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

