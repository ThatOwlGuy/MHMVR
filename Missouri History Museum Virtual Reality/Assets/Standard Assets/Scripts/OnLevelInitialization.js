#pragma strict

public class OnLevelInitialization extends MonoBehaviour{
	enum screenRot{portrait, landscape}
	
	@SerializeField
	private var screenMode : screenRot;
	
	public function Awake(){
		
		switch (screenMode){
			case screenRot.portrait:
				Screen.orientation = ScreenOrientation.Portrait;
				break;
			case screenRot.landscape:
				Screen.orientation = ScreenOrientation.LandscapeLeft;
				break;
		}
		
	}
}