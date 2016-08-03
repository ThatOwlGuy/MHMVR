#pragma strict

public class InteractiveReticle extends MonoBehaviour{	
	//Reticle images
	@SerializeField
	private var center : Image;
	@SerializeField
	private var bar : Image;
	
	//Colors
	@SerializeField
	private var activeColor : Color;
	@SerializeField
	private var inactiveColor : Color;
	
	//Interactor variables
	@SerializeField
	private var head : Transform;
	@SerializeField
	private var visible : boolean;
	@SerializeField
	private var maxSize : float;
	
	private var sizeChangeSpeed : Vector2;
	
	function Awake(){
		center.color = inactiveColor;
		bar.color = activeColor;
	}
	
	public function UpdateLoadingBar(progress : float){
		bar.fillAmount = progress;
	}
	
	public function ChangeColor(){
		if(center.color == activeColor){
			center.color = inactiveColor;
		}else{
			center.color = activeColor;
		}
	}
}