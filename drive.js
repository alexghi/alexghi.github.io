function onAddFilesFromGdriveBtnClick( el ) {
	var me = this,
		developerKey = 'AIzaSyCsGnDhkP3RkiKnAS558FnqPzvZiatM8LE',
		clientId = '261841290699-p7vdsgdulv56r9ck7mhnu1lk606uvn22.apps.googleusercontent.com',
		appId = '-LOb1myPgzI78gBshu1Iw6VL',
		scope = ['https://www.googleapis.com/auth/drive'],
		pickerApiLoaded = false,
		oauthToken,
		onAuthApiLoad = function() {
			window.gapi.auth2.authorize(
				{
					'client_id': clientId,
					'scope': scope,
					'immediate': false
				},
				handleAuthResult );
		},
		onPickerApiLoad = function() {
			pickerApiLoaded = true;
		},
		handleAuthResult = function( authResult ) {
			if( authResult && !authResult.error ) {
				oauthToken = authResult.access_token;
				me.oauthToken = oauthToken;
				createPicker();
			}
		},
		createPicker = function() {
			var picker,
				view,
				uploadView;

			// creeam pickerul daca picker api e loaded si avem oauthToken
			if( pickerApiLoaded && oauthToken ) {
				view = new google.picker.DocsView().setIncludeFolders( true );
				view.setParent( 'root' );
				me.picker = picker = new google.picker.PickerBuilder()
					.enableFeature( google.picker.Feature.MULTISELECT_ENABLED )
					.setAppId( appId )
					.setOAuthToken( oauthToken )
					.setDeveloperKey( developerKey )
					.addView( view )
					.addView( google.picker.ViewId.DOCUMENTS )
					.addView( google.picker.ViewId.SPREADSHEETS )
					.addView( google.picker.ViewId.PRESENTATIONS )
					.addView( google.picker.ViewId.DOCS_IMAGES )
					.addView( google.picker.ViewId.PDFS )
					.setCallback( pickerCallback )
					.build();

				showPicker( picker );
			}
		},
		showPicker = function( picker ) {
			picker.setVisible( true );
		},
		pickerCallback = function( data ) {
			var pickedItems;
			if( data.action === google.picker.Action.PICKED ) {
				alert( google.picker.Action.PICKED );
				// do something
			}
		};

	this.loadScript( 'https://apis.google.com/js/api.js', onLoad());
	function onLoad() {
		gapi.load( 'auth2', {'callback': onAuthApiLoad} );
		gapi.load( 'picker', {'callback': onPickerApiLoad} );
	}
}

function loadScript( url, callback ) {
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName( 'head' )[0];
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	head.appendChild( script );
}