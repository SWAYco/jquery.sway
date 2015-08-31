SDK for adding SWAYco surveys to your site
==========================================

## Requirements ##
- jQuery >= 1.8

## Quick start ##

- Register on [SWAYco](http://mph-markelytics.com) site
- Go to [account page](http://mph-markelytics.com/app)
- Press "Add an Website" button and fill the form
- Copy `distribution id` at top of the page and `application id` of just added website
- Add scripts to your page:

```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="//mph-markelytics.com/public/storage/jquery.markelytics.0.0.2.js"></script>
```

- Init SDK:

```js
var markelyticsIcon = new MarkelyticsIcon({
    distribution_id: 'distribution_id',
    application_type: 'web',
    application_id: 'application_id',
    onSuccess: function(surveyFrom) {
      // developer or researcher
      console.log('survey from', surveyFrom);
      
      // hide icon and survey:
      markelyticsIcon.hideIcon();
    }
});
```

- Check user compatibility and load survey if we have surveys for current user:

```js
markelyticsIcon.checkUserCompatibility({}, function(resp) {
  // resp can be one of: yes, no, may_be
  console.log(resp);
  if(resp == 'yes' || resp == 'may_be') {
    // load survey
    markelyticsIcon.loadSurvey(function() {
      console.log('survey loaded (loadSurvey callback)');
      
      // show Sway icon
      markelyticsIcon.showIcon();
    });
  }
});
```


## API ##

### Constructor ###

```
MarkelyticsIcon(<Object> options)
```

Creates new instance of MarkelyticsIcon.

`options` hash:
- `distribution_id` - `<String>` Required. Get it in [dashboard](http://mph-markelytics.com/app)
- `application_id` - `<String>` Required. You get it after adding new App or Website in [dashboard](http://mph-markelytics.com/app)
- `container` - `<DOM Node | jQuery Object>`. If provided, survey will be placed inside this container immediately.
- `onLoaded()` - `<Function>`. Callback, which will be called, when the survey will be successfully loaded (after `.loadSurvey()` call).
- `onQuestions(<Object> questions)` - `<Function>`. Callback, which will be called after `onLoaded`. One argument with array of questions and answers for loaded survey.
- `onSuccess(<String> surveyFrom)` - `<Function>`. Callback, which will be called after survey successful completes. One argument with String (`developer` or `researcher`).
Shows whose survey was passed.
- `onTerminated()` - `<Function>`. Callback, which will be called, when user choose terminating answer.
- `onAudienceMismatch()` - `<Function>`. Callback, which will be called, if we do not have the survey for this user.
- `onError(<String> err)` - `<Function>`. Callback, which will be called, if you enter invalid `distribution_id` or `application_id`, or on server error.



### Methods ###

#### Load survey ####

```
.loadSurvey([<Object> options[,<Function> callback]])
```

- `options` hash accept following CSS properties for future survey container:
  - `left` - Default: `'auto'`
  - `right` - Default: `'20px'`
  - `top` - Default: `'90px'`
  - `bottom` - Default: `'auto'`
  - `width` - Default: `'500px'`
  
  You can pass values in any valid jQuery format.

- `callback` - function which will be called, when the survey will be successfully loaded.


#### Show Icon ####

```
.showIcon([<Object> options])
```

Show fixed icon on top-right of page. On click on this icon will be showed survey container.

- `options` hash accept following CSS properties for future icon:
  - `left` - Default: `'auto'`
  - `right` - Default: `'20px'`
  - `top` - Default: `'90px'`
  - `bottom` - Default: `'auto'`
  
  You can pass values in any valid jQuery format.


#### Hide Icon ####

```
.hideIcon()
```

Hide icon and survey container.


#### Check user compatibility ####

```
.checkUserCompatibility(<Object> userInformation, <Function> callback(<String> response))
```

Check whether we have surveys for provided user data.

- `userInformation` hash:
  - `country` can be any string
  - `state` can be any string
  - `age` can be one of: "13-17 yrs", "18-24 yrs", "25-34 yrs", "35-44 yrs", "45-54 yrs", "55-64 yrs", "65+ yrs"
  - `gender` can be one of: "Male", "Female"
  - `device` can be one of: "Desktop/Laptop", "Mobile", "Tablet"
  - `os` can be one of: "Windows", "Mac", "Linux", "IOS", "Android", "Other"
  - `browser` can be one of: "Chrome", "Firefox", "Safari", "Internet Explorer", "Other"

- `callback(<String> response)` - function with one argument. Response indicates surveys availability for current user and can be `yes`, `no` or `may_be`.

