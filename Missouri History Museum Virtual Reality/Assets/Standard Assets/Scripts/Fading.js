#pragma strict
import UnityEngine.UI;

public class Fading extends MonoBehaviour{
	public var img : RawImage;

	public var fadeSpeed  : float = 0.8f;
	private var realFadeSpeed : float;

	public var fading : boolean;
	public var toWhite : boolean;
	
	public var faded : boolean;

	function Awake(){
		img = gameObject.GetComponent(RawImage);
		//print(img.name);
		if(img == null){print("no raw image found");}
	}

	function LateUpdate(){
		if(fading){
			CalculateRealFadeSpeed();

			if(toWhite){
				AlphaUp();
			}else{
				AlphaDown();
			}
		}
		
		if(faded == true){
			//print("done fading");
			faded = false;
		}
	}

	public function FadeToWhite(){
		fading = true;
		toWhite = true;
	}

	public function FadeToClear(){
		fading = true;
		toWhite = false;
	}

	private function AlphaDown(){
		img.color = Color.Lerp(img.color, Color.clear, realFadeSpeed * Time.deltaTime);
		if(img.color.a < 0.0f){
			img.color.a = 0.0f;
			fading = false;
			faded = true;
		}
	}

	private function AlphaUp(){
		img.color = Color.Lerp(img.color, Color.white, realFadeSpeed * Time.deltaTime);
		if(img.color.a > 0.95f){
			img.color.a = 1.0f;
			fading = false;
			faded = true;
		}
	}

	private function CalculateRealFadeSpeed(){
		var coefficient : float;

		if(toWhite){
			coefficient = img.color.a + 0.1f;
		}else{
			coefficient = Mathf.Abs(img.color.a - 1.0f) + 0.1f;
		}

		realFadeSpeed = fadeSpeed * fadeSpeed * fadeSpeed * coefficient;
	}
}