package org.apache.cordova.plugin;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Rect;
import android.os.Bundle;
import android.util.Base64;
import android.view.Display;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.WorkCover.R;
import com.samsung.android.sdk.SsdkUnsupportedException;
import com.samsung.android.sdk.pen.Spen;
import com.samsung.android.sdk.pen.document.SpenNoteDoc;
import com.samsung.android.sdk.pen.document.SpenPageDoc;
import com.samsung.android.sdk.pen.engine.SpenSurfaceView;

public class MainActivity extends Activity {
	private Context mContext;
	private SpenNoteDoc mSpenNoteDoc;
	private SpenPageDoc mSpenPageDoc;
	private SpenSurfaceView mSpenSurfaceView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		mContext = this;

		// Initialize Pen.
		boolean isSpenFeatureEnabled = false;
		Spen spenPackage = new Spen();
		try {
			spenPackage.initialize(this);
			isSpenFeatureEnabled = spenPackage
					.isFeatureEnabled(Spen.DEVICE_PEN);
		} catch (SsdkUnsupportedException e) {
			Toast.makeText(mContext, "This device does not support S pen.",
					Toast.LENGTH_SHORT).show();
			e.printStackTrace();
			finish();
		} catch (Exception e1) {
			Toast.makeText(mContext, "Cannot initialize Pen.",
					Toast.LENGTH_SHORT).show();
			e1.printStackTrace();
			finish();
		}
		// Create Pen View.
		RelativeLayout spenViewLayout = (RelativeLayout) findViewById(R.id.spenViewLayout);
		mSpenSurfaceView = new SpenSurfaceView(mContext);
		if (mSpenSurfaceView == null) {

			Toast.makeText(mContext, "Cannot create new SpenSurfaceView.",
					Toast.LENGTH_SHORT).show();
			finish();
		}
		spenViewLayout.addView(mSpenSurfaceView);
		// Get the dimensions of the screen.
		Display display = getWindowManager().getDefaultDisplay();
		Rect rect = new Rect();
		display.getRectSize(rect);
		// Create SpenNoteDoc.
		try {
			mSpenNoteDoc = new SpenNoteDoc(mContext, rect.width(),
					rect.height());
		} catch (IOException e) {
			Toast.makeText(mContext, "Cannot create new NoteDoc.",
					Toast.LENGTH_SHORT).show();
			e.printStackTrace();
			finish();
		} catch (Exception e) {
			e.printStackTrace();
			finish();
		}
		// After adding a page to NoteDoc, get an instance and set it // as a
		// member variable.
		mSpenPageDoc = mSpenNoteDoc.appendPage();
		mSpenPageDoc.setBackgroundColor(0xFFD6E6F5);
		mSpenPageDoc.clearHistory();
		// Set PageDoc to View.
		mSpenSurfaceView.setPageDoc(mSpenPageDoc, true);
		if (isSpenFeatureEnabled == false) {

			mSpenSurfaceView.setToolTypeAction(SpenSurfaceView.TOOL_FINGER,
					SpenSurfaceView.ACTION_STROKE);
			Toast.makeText(
					mContext,
					"Device does not support S pen. \nYou can draw strokes with your finger",
					Toast.LENGTH_SHORT).show();
		}
	}

	public void clearAll(View v) {
		mSpenPageDoc.removeAllObject();
		mSpenSurfaceView.update();
	}

	public void submitImage(View v) {
		// closeSettingView();
		captureSpenSurfaceView();
	}

	private void captureSpenSurfaceView() {
		String encodedImage = null;// Select the location to save the
		// image.
		// String filePath = Environment.getExternalStorageDirectory()
		// .getAbsolutePath() + "/SPen/images";
		// File fileCacheItem = new File(filePath);
		// if (!fileCacheItem.exists()) {
		// if (!fileCacheItem.mkdirs()) {
		// Toast.makeText(mContext, "Save Path Creation Error",
		// Toast.LENGTH_SHORT).show();
		// return;
		// }
		// }
		// filePath = fileCacheItem.getPath() + "/CaptureImg.png"; // Save the
		// // screen shot
		// // as a Bitmap.
		Bitmap imgBitmap = mSpenSurfaceView.captureCurrentView(true);
		// OutputStream out = null;
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			imgBitmap.compress(Bitmap.CompressFormat.PNG, 100, baos); // bm
																		// is
																		// the
			// bitmap
			// object
			byte[] b = baos.toByteArray();
			encodedImage = Base64.encodeToString(b, Base64.DEFAULT);
			// // Save the Bitmap in the selected location.
			// // out = new FileOutputStream(filePath);
			// // imgBitmap.compress(CompressFormat.PNG, 100, out);
			// Toast.makeText(
			// mContext,
			// "Captured images were stored in the file \'CaptureImg.png\'.",
			// Toast.LENGTH_SHORT).show();
		} catch (Exception e) {
			Toast.makeText(mContext, "Capture failed.", Toast.LENGTH_SHORT)
					.show();
			e.printStackTrace();
		} finally {
			// try {
			// // if (out != null) {
			// // out.close();
			// // }
			// // sendBroadcast(new
			// // Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,
			// // Uri.parse("file://"
			// // + Environment.getExternalStorageDirectory())));
			// // Bitmap bm = BitmapFactory.decodeFile("/path/to/image.jpg");
			//
			// } catch (Exception e) {
			// e.printStackTrace();
			// }
		}
		imgBitmap.recycle();
		Intent returnIntent = new Intent();
		// returnIntent.putExtra("savedImage", savePath);
		returnIntent.putExtra("base64Image", encodedImage);
		setResult(RESULT_OK, returnIntent);

		MainActivity.this.finish();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		if (mSpenSurfaceView != null) {
			mSpenSurfaceView.close();
			mSpenSurfaceView = null;
		}
		if (mSpenNoteDoc != null) {
			try {
				mSpenNoteDoc.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			mSpenNoteDoc = null;
		}
	};

}
