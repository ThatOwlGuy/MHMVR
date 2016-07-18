#pragma strict
//import Cardboard.SDK;

public class TouchHandler extends MonoBehaviour{
	private static var tapTime : float;

	enum TouchType{NoTap = 0, Tap = 1, DoubleTap = 2, Hold = 3};

	public static var curTouch : TouchType;
	
	private var justPressed : boolean = false;
	private var held : boolean = false;
	
	function Update(){
		if(curTouch == TouchType.DoubleTap){
			curTouch = TouchType.NoTap;
		}
	
		if(Input.GetMouseButtonDown(0) || justPressed){
			if(Time.time > tapTime){
				tapTime = Time.time + 1;
				curTouch = TouchType.Tap;
				print("Tap!");
			}else{
				curTouch = TouchType.DoubleTap;
				print("DoubleTap!");
			}
		}else if( Input.GetMouseButton(0) || held){
			curTouch = TouchType.Hold;
			print("Hold!!");
		}else if ( !(Input.GetMouseButton(0) || held) ){
			curTouch = TouchType.NoTap;
		}
	}
	
	function JustPressed(){
		justPressed = true;
	}
	
	function Held(){
		held = true;
	}
	
	function NoPress(){
		justPressed = false;
		held = false;
	}
}