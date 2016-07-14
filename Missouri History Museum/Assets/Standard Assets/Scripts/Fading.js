#pragma strict
import UnityEngine.UI;

public class Fading extends MonoBehaviour{
	public var img : RawImage;

	public var fadeSpeed = 0.8f;
	private var alpha : float= 1.0f;

	public var fading : boolean;
	public var toWhite : boolean;
	
	public var faded : boolean;

	function Awake(){
		img = gameObject.GetComponent(RawImage);
		print(img.name);
		if(img == null){print("no raw image found");}
	}

	function LateUpdate(){
		if(fading){
			if(toWhite){
				AlphaUp();
			}else{
				AlphaDown();
			}
		}
		
		if(faded == true){
			print("done fading");
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
		img.color = Color.Lerp(img.color, Color.clear, fadeSpeed * Time.deltaTime);
		if(img.color.a < 0.1f){
			img.color.a = 0.1f;
			fading = false;
			faded = true;
		}
	}

	private function AlphaUp(){
		img.color = Color.Lerp(img.color, Color.white, fadeSpeed * Time.deltaTime);
		if(img.color.a > 0.95f){
			img.color.a = 1.0f;
			fading = false;
			faded = true;
		}
	}
}