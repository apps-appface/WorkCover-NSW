//****************************************************************************************
//Module Name		: 	SCanvas
//Author Name		: 	Marcus Manvinder
//Date				: 	Sept-25-2012
//Purpose			: 	Plugin class to handle the javascript function call.
//Table referred	: 	NA
//Table updated		: 	NA
//Most Important Related Files: com.ith.spen.plugin.SCanvasActivity,java
//****************************************************************************************

package org.apache.cordova.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

/**
 * This class invokes SCanvas called from JavaScript.
 */
public class SCanvas extends CordovaPlugin {

	public static final int REQUEST_CODE = 1;
	public static final String MainActivity_LAUNCH = "org.apache.cordova.plugin.MainActivity";

	public CallbackContext callback;

	// ********************************************************************************************************************
	// Author Name : Hanumantha Rao Date : feb-25-2015
	// Input Parameters : action - The action to execute.
	// args - JSONArry of arguments for the plugin.
	// callbackId - The callback id used when calling back into JavaScript.
	// Purpose : Executes the request and returns PluginResult.
	// ********************************************************************************************************************

	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		callback = callbackContext;
		Log.d("abcd", "CallbackId: ");

		// String backgroundImageUrl = null;
		// boolean saveOnlyForegroundImage = false;

		if (action.equals("showCanvas")) {
			Log.d("abcd", "execute SCanvas Called.");
			// JSONObject obj = args.optJSONObject(0);
			// if (obj != null) {
			// backgroundImageUrl = obj.optString(BACKGROUND_IMAGE_URL);//
			// return
			// // empty
			// // if
			// // not
			// // defined
			//
			// saveOnlyForegroundImage = obj
			// .optBoolean(SAVEONLYFOREGROUND_IMAGE);// returns false
			// // if not
			// // defined
			//
			// foregroundImageData = obj.optString(FOREGROUND_IMAGE_DATA);//
			//
			// if (backgroundImageUrl.isEmpty()) {
			// // default file path
			// backgroundImageUrl = null;
			// }
			//
			// if (foregroundImageData.isEmpty()) {
			// foregroundImageData = null;
			// }
			// }

			try {
				Intent intent = new Intent(
						"org.apache.cordova.plugin.MainActivity");
				intent.addCategory(Intent.CATEGORY_DEFAULT);

				// Bundle bundle = new Bundle();
				// bundle.putString("backgroundImageUrl", backgroundImageUrl);
				// bundle.putBoolean("saveOnlyForegroundImage",
				// saveOnlyForegroundImage);
				// bundle.putString("foregroundImageData", foregroundImageData);
				//
				// intent.putExtras(bundle);
				intent.setPackage(this.cordova.getActivity()
						.getApplicationContext().getPackageName());

				this.cordova.startActivityForResult((CordovaPlugin) this,
						intent, REQUEST_CODE);
				Log.d("abcd", "open SCanvas Called.");
			} catch (Exception ex) {
				Log.d("abcd", "Canvas Launching error.");
				Log.d("abcd", ex.toString());
			}
		} else {
			Log.d("abcd", "Invalid Action called");
			return false;
		}

		// return pluginResult;
		// PluginResult pluginResult = new
		// PluginResult(PluginResult.Status.NO_RESULT);
		// pluginResult.setKeepCallback(true);
		return true;
	}

	// ********************************************************************************************************************
	// Author Name : Marcus Manvinder Date : Sept-25-2012
	// Input Parameters : requestCode - The request code originally supplied to
	// startActivityForResult(), allowing you to identify from where this result
	// came.
	// resultCode - The integer result code returned by the child activity
	// through its setResult().
	// intent - An Intent, which can return result data to the caller (various
	// data can be attached to Intent "extras").
	// Purpose : Called when the activity returns the result.
	// ********************************************************************************************************************

	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		String base64Image = null;
		Log.d("abcd", "Returned from Canvas Activity");
		JSONObject obj = new JSONObject();
		if (requestCode == REQUEST_CODE) {
			if (resultCode == Activity.RESULT_OK) {

				try {
					base64Image = intent.getStringExtra("base64Image");
					obj.put("imageData", base64Image);
					// obj.put("imageUri", intent.getStringExtra("savedImage"));

					// savedImagePath = intent.getStringExtra("savedImage");

					Log.d("abcd", "Setting Success callback" + base64Image);
					callback.success(base64Image);

				} catch (Exception e) {
					Log.d("abcd", "This should never happen");
				}
				// Log.d("abcd", savedImagePath);
			} else if (resultCode == Activity.RESULT_CANCELED) {
				Log.d("abcd", "Setting Failed callback" + resultCode);
				// JSONObject obj = new JSONObject();
				try {
					obj.put("imageData", intent.getStringExtra("base64Image"));
					// obj.put("imageUri", intent.getStringExtra("savedImage"));

					// savedImagePath = null;
					base64Image = null;
				} catch (Exception e) {
					// Log.d(LOG_TAG, "This should never happen");
				}
				callback.error("Failed to capture signature");
			} else {
				Log.d("abcd", "Setting Failed callback" + resultCode);
				callback.error("error");
			}
		}
	}
}
