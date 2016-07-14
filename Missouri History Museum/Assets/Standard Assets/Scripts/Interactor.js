#pragma strict
import UnityEngine.UI;

public class Interactor extends RayCastHit{
	public var maxDistance : int;

	public var cursors : UnityEngine.UI.RawImage[];
	public var transitionSpeed : float;

	private var transition : boolean;
	private var curDist : float;
	private var wide : boolean;
	
	function LateUpdate(){	
		//Checking for objects to interact with curObject
		if(curObject){
			var curDist = Vector3.Distance(transform.position, curObject.transform.position);
			
			//If you can do something with an object (if it's selectable or equippable)
			//then widen the cursor. otherwise, shrink it
			if(!wide && curDist < maxDistance){
				if(curObject.tag == "Triggerable"){
					//print("Selectable!");
					wide = true;
					transition = true;
				}
			}else if (wide && curObject.tag != "Triggerable"){
				wide = false;
				transition = true;
			}
			
			//If we get a selectable Object
			if(curObject.tag == "Triggerable" && curDist < maxDistance){
				if(Input.GetButtonDown("Interact")){
					curObject.SendMessage("Triggered");
				}
			}
		}else if(wide){
			wide = false;
			transition = true;
		}
		
		//if transition... ummm transition or something I guess
		if(transition){
			Transition();
		}
	}
	
	function Transition(){
		//print("transitioning~?");
		for(var i : int; i < cursors.Length; i++){
			var transNum : float = cursors[i].rectTransform.sizeDelta[0];
			
			if(wide){
				transNum += 1 * transitionSpeed;
				if(transNum >= 45){
					transNum = 35;
					transition = false;
				}
			}else{
				transNum += -1 * transitionSpeed;
				if(transNum <= 0){
					transNum = 0;
					transition = false;
				}
			}		
			cursors[i].rectTransform.sizeDelta = new Vector2(transNum, transNum);
		}
	}
}