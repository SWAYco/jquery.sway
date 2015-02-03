
(function(window, $) {

  var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
  };

  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1],
      scriptHostname = getLocation(currentScript.src).hostname || 'swayco.co',
      scriptProtocol = getLocation(currentScript.src).protocol || 'http:';

  var apiUrl = scriptProtocol + '//' + scriptHostname;

  var ObjectToQS = function(array) {
    var pairs = [];
    for (var key in array)
      if (array.hasOwnProperty(key))
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));
    return pairs.join('&');
  };

  var SwayIcon = window.SwayIcon = function(options) {
    var that = this;
    this.options = $.extend({
      distribution_id: 'test',
      application_type: 'web',
      application_id: null,
      user: {},
      onEnd: function() {},
      onQuestions: function() {},
      onLoaded: function() {},
      onSuccess: function() {},
      onTerminated: function() {},
      onAudienceMismatch: function() {},
      onError: function() {}
    }, options);

    if(options.apiUrl) {
      apiUrl = options.apiUrl;
    }

    this.options.distribution_id = $.trim(this.options.distribution_id);
    this.options.application_id = $.trim(this.options.application_id);
    this.options.application_type = $.trim(this.options.application_type);

    if(!this.options.distribution_id) {
      throw new Error('distribution_id is required');
    }
    if(!this.options.application_id) {
      throw new Error('application_id is required');
    }

    if(this.options.container) {
      this._$container = $(this.options.container);
    } else {
      this._$container = $('<div/>', {id: 'sway_container'});
    }
    this._hideContainer = function() {
      that._$container.hide();
      that._$logo.css('right', that.options.right);
    };

    this._showContainer = function() {
      that._$container.show();
      that._$logo.css('right', parseInt(that.options.right, 10) + parseInt(that._$container.outerWidth(), 10));
      that._$container.find('iframe').iFrameResize({
        enablePublicMethods: true,
        //log: true,
        autoResize: false,
        sizeWidth: true,
        resizedCallback: function(obj) {
          that._$container.css({
            width: obj.width,
            height: obj.height
          });
          that._$logo.css({
            right: that._$container.outerWidth(true) + parseInt(that._$container.css('right'), 10)
          });
        },
        initCallback: function(iframe) {
          iframe.contentWindow.postMessage('set:id:' + $(iframe).attr('id'), '*');
        }
      });
    };

    this._makeUrl = function(isFloating) {
      var url = apiUrl + '/distribution/'+ this.options.distribution_id +'/'+ this.options.application_type + (this.options.application_id ? '/' + this.options.application_id : ''),
          queryString = ObjectToQS(this.options.user);

      if(isFloating === true) {
        if(queryString) {
          queryString = queryString + '&floating=1';
        } else {
          queryString = 'floating=1';
        }
      }

      if(queryString) {
        url = url + '?' + queryString;
      }
      return url;
    };

    this._createIframe = function($container) {
      var that = this;

      this.options = $.extend(this.options, {
        width: '100%',
        height: '300px',
        name: 'sway_distribution_frame_' + Date.now(),
        id: 'sway_distribution_frame_' + Date.now()
      }, options);

      var url = this._makeUrl($container.data('floating'));

      // create new iframe, but not insert to DOM
      this._$iframe = $('<iframe />', {
        name: this.options.name,
        id: this.options.id,
        src: url,
        width: this.options.width,
        height: this.options.height,
        frameBorder: 0,
        scrolling: "no"
      });

      var regexp = new RegExp('^' + this._$iframe.attr('id') + ':');
      var postMessageController = function(e) {
        if(e.origin == apiUrl && regexp.test(e.data)) {
          var data = e.data.replace(regexp, '');
          if(data == 'surveyEnd') {
            var $sway_logo = $('#sway_logo');
            if(that.data('floating') == true) {
              $sway_logo.css('right', $sway_logo.data('right'));
            }
            that.options.onEnd.call(that, e);
          } else if(data == 'distributionReady') {
            $container.trigger('sway:loaded');
            that.options.onLoaded.call(that);
          } else if(/^surveyQuestionsText:/.test(data)) {
            var questionsData = JSON.parse(data.replace('surveyQuestionsText:', ''));
            $container.trigger('sway:questions', questionsData);
            that.options.onQuestions.call(that, questionsData);
          } else if(/^success:/.test(data)) {
            var surveyFrom = data.replace('success:', '');
            $container.trigger('sway:success', surveyFrom);
            that.options.onSuccess.call(that, surveyFrom);
          } else if(data == 'terminated') {
            $container.trigger('sway:terminated');
            that.options.onTerminated.call(that);
          } else if(data == 'audience') {
            $container.trigger('sway:audienceMismatch');
            that.options.onAudienceMismatch.call(that);
          } else if(data == 'wrong_id' || e.data == 'wrongDistribution') {
            $container.trigger('sway:error');
            that.options.onError.call(that, 'wrong distribution or application id');
          }
        }
      };

      // add window postMessage event listener and wait for messages from iframe
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

      eventer(messageEvent, postMessageController, false);

      // close survey method. simple removing
      this.close = function() {
        this._$iframe.remove();
        return this;
      };

      // insert created iframe to DOM
      if($container && $container.jquery) {
        $container.html(this._$iframe);
      }

      this._$iframe.on('load', function() {
        console.debug('iframe loaded');
        that._$iframe[0].contentWindow.postMessage('set:id:' + that._$iframe.attr('id'), '*');
      });

      return this;
    };

    if(this.options.container) {
      if(!this.options.container.jquery) {
        this.options.container = $(this.options.container);
      }

      this._createIframe(this.options.container);
    }

    return this;
  };

  SwayIcon.prototype.showIcon = function(options) {
    console.log('showIcon called');
    var that = this;
    this.options = $.extend(this.options, {
      left: 'auto',
      right: '20px',
      top: '90px',
      bottom: 'auto',
      width: '500px'
    }, options);

    var $existedLogo = $('#sway_logo');
    this._$logo = $existedLogo.length ? $existedLogo : $('<div/>', {id: 'sway_logo'});
    this._$logo.css({
      left: this.options.left,
      right: this.options.right,
      top: this.options.top,
      bottom: this.options.bottom,
      position: 'fixed',
      background: '#D7D7D7 url('+ apiUrl +'/public/images/blue_2.png) no-repeat center center',
      width: '65px',
      height: '65px',
      borderRadius: '10px',
      zIndex: '5600',
      cursor: 'pointer'
    }).data('right', this.options.right);

    this._$logo.unbind('click').bind('click', function() {
      if(!that._$container.find('iframe').length) {
        that.loadSurvey(that.options);
      }

      if(that._$container.is(':visible')) {
        that._hideContainer();
      } else if(!that._$container.is(':empty')) {
        that._showContainer();
      }
    });

    $('body').append(this._$logo);

    if(that._$container.is(':visible')) {
      that._$logo.css('right', parseInt(that.options.right, 10) + parseInt(that._$container.outerWidth(), 10));
    }

  };

  SwayIcon.prototype.hideIcon = function() {
    this._hideContainer();
    this._$logo.remove();
  };

  SwayIcon.prototype.loadSurvey = function(options, callback) {
    var that = this;
    this.options = $.extend(this.options, {
      left: 'auto',
      right: '20px',
      top: '90px',
      bottom: 'auto',
      width: '500px'
    }, options);

    var $existingContainer = $('#sway_container');
    if(!$existingContainer.length) {
      this._$container = $('<div/>', {id: 'sway_container'});
    } else {
      this._$container = $existingContainer;
    }

    this._$container.css({
      left: this.options.left,
      right: this.options.right,
      top: this.options.top,
      bottom: this.options.bottom,
      position: 'fixed',
      zIndex: '5600',
      width: this.options.width,
      height: '200px',
      display: 'none'
    }).data('floating', true);

    this._createIframe(this._$container);

    $('body').append(this._$container);

    this._$container.one('sway:loaded', function() {
      console.warn('sway:loaded');
      if(typeof callback === 'function') {
        callback.call(that);
      }
    });
    return this;
  };


  SwayIcon.prototype.checkUserCompatibility = function(user, callback) {
    return $.ajax({
      url: apiUrl + "/misc/checkUserCompatibility",
      jsonp: "callback",
      dataType: "jsonp",
      data: {
        distribution_id: this.options.distribution_id,
        distribution_type: this.options.application_type,
        app_id: this.options.application_id,
        user: JSON.stringify(user)
      }
    }).done(function(data) {
      if(typeof callback === 'function') {
        callback(data);
      }
    }).fail(function() {
      if(typeof callback === 'function') {
        callback('no');
      }
    });
  };

})(window, jQuery);