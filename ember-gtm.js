// Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s);j.async=true;j.src=
  '//www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PDQCLW');
// End Google Tag Manager

var log = function(msg) {
  console.log("%c[GTM] " + msg, 'color: #999;');
};

// Track where the modal was launched from.
var modalCategory;

App.GTMService = Ember.ObjectController.extend({

  needs: ['application'],

  init: function () {
    this._super();

    var self = this;
    this.container.lookup('router:main').on('didTransition', function () {
      self.trackPageView(this.get('url'));
    });
  },

  applicationController: Ember.computed.alias('controllers.application'),

  defaultEvent: {
    event: 'trackEvent',
    eventCategory: '',
    eventAction: '',
    eventLabel: '',
    eventValue: ''
  },

  defaultPageView: {
    event: 'vpv',
    virtualPagePath: ''
  },

  defaultSocial: {
    event: 'trackSocial',
    socialNetwork: '',
    socialAction: '',
    socialTarget: ''
  },

  createPayload: function (type, o) {
    var data = o || {};
    var defaultPayload = this['default' + type];
    var payload = {};
    Object.keys(defaultPayload).forEach(function (key) {
      payload[key] = data.hasOwnProperty(key) ? data[key] : defaultPayload[key];
    });
    return payload;
  },

  updateModalCategory: function () {
    modalCategory = null;
    modalCategory = this.eventCategory();
  },

  eventCategory: function (sender) {
    if (this.get('applicationController.modalActive') && modalCategory) return modalCategory;
    if (sender instanceof App.ApplicationHeaderController) return 'Header';
    if (sender instanceof App.ApplicationFooterController) return 'Footer';
    if (this.get('applicationController.navActive')) return 'Menu';
    if (this.get('applicationController.boxManagerActive')) return 'Box';
    return (this.get('applicationController.currentRouteName') || 'Loading').titleize();
  },

  eventAction: function (sender, actionName) {
    var eventActionParts = [ actionName ];
    if (this.get('applicationController.modalActive')) {
      eventActionParts.unshift(this.get('applicationController.modalName'));
    }
    eventActionParts = eventActionParts.map(function (s) { return s.titleize(); });
    return eventActionParts.join(' - ');
  },

  eventLabel: function () {
    var i, arg, sku;
    for (i = arguments.length - 1; i >= 0; i--) {
      arg = arguments[i];
      if (arg instanceof Ember.Object) {
        sku = arg.get('sku') || arg.get('model.sku') || arg.get('product.sku') || arg.get('extra.product.sku') || arg.get('subscribable.product.sku');
        if (sku) return sku;
      }
    }
  },

  trackAction: function (sender, actionName) {
    if (!(sender.get('trackedActions') && sender.get('trackedActions')[actionName])) return;
    this.trackEvent({
      eventCategory: this.eventCategory.apply(this, arguments),
      eventAction: this.eventAction.apply(this, arguments),
      eventLabel: this.eventLabel.apply(this, arguments)
    });
  },

  trackEvent: function (o) {
    var payload = this.createPayload('Event', o);
    log('%@ ➜ %@'.fmt(payload.eventCategory, payload.eventAction) + (payload.eventLabel ? ' ➜ %@'.fmt(payload.eventLabel) : ''));
    this.pushPayload(payload);
  },

  trackModal: function (name, model) {
    this.updateModalCategory();
    this.trackPageView('/%@/modal/%@/%@'.fmt(this.eventCategory().toLowerCase(), name, this.eventLabel(model)));
  },

  trackPageView: function (path) {
    log('VPV: %@'.fmt(path));
    this.pushPayload(this.createPayload('PageView', { virtualPagePath: path }));
  },

  trackSocial: function (o) {
    var payload = this.createPayload('Social', o);
    log('Social: %@ ➜ %@ ➜ %@'.fmt(payload.socialNetwork, payload.socialAction, payload.socialTarget));
    this.pushPayload(payload);
  },

  pushPayload: function(payload) {
    window.dataLayer.push(payload);
  }

});

Ember.ActionHandler.reopen({

  init: function() {

    // Any `trackedActions` will be mixed in to
    // `actions` as a `noop` function.
    if (this.trackedActions) {
      for ( var key in this.trackedActions ){
        if ( this.trackedActions[key] && this._actions && !this._actions[key]) {
          this._actions[key] = $.noop;
        }
      }
    }

    this._super();
  },

  send: function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this);

    var gtm = this.container.lookup('service:gtm');
    gtm.trackAction.apply(gtm, args);

    try {
      return this._super.apply(this, arguments);
    } catch(e){
      Rollbar.warning("Error in ActionHandler#send", e);
    }

  }
});

Ember.Component.reopen({

  // Our customization of ActionHandler.send gets wiped out in components when they overwrite
  send: function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this);

    var gtm = this.container.lookup('service:gtm');
    gtm.trackAction.apply(gtm, args);

    try {
      return this._super.apply(this, arguments);
    } catch(e){
      Rollbar.warning("Error in Component#send", e);
    }

  }
});