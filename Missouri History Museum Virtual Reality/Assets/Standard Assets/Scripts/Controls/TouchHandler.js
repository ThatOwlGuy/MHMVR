#pragma strict
//import Cardboard.SDK;

public class TouchHandler extends MonoBehaviour{
	@SerializeField
	private var tapTime : float;
	private var timeOut : float;

	enum TouchType{NoTap = 0, Tap = 1, DoubleTap = 2, Hold = 3};

	public static var curTouch : TouchType;
	
	private var justTapped : boolean = false;
	
	//Cheacks for "taps" for mouse-click equivalents
	function Update(){
		//Starts tapTime counter when screen is touched
		if(Input.GetButtonDown(0)){
			timeOut = Time.time + tapTime;
		}else if(Input.GetMouseButtoUp(0)){	//Taps are registered on release
			JustTapped();
		}else if(Input.GetMouseButton(0)){	//Holds are checked if we get the mouse at all
			Held();
		}else{
			NoPress();			//no activity brings it to a NotPressedState
		}
	}
	
	//if the s
	function JustTapped(){
		if(justTapped && InTapTime()){
			curTouch = TouchType.DoubleTap;
		}else{
			curTouch = TouchType.Tap;
			justTapped = true;
		}
	}
	
	function Held(){
		if(InTapTime()){
			return;
		}
		
		curTouch = TouchType.Hold;
	}
	
	function NoPress(){
		justTapped = InTapTime();
		curTouch = TouchType.NoTap;
	}
	
	function InTapTime() : boolean{
		return (timeOut > Time.time);
	}
}
