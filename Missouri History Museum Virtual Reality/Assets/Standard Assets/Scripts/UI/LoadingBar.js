#pragma strict

public class LoadingBar extends MonoBehaviour{
	private var head : Transform;
	private var interactor : Interactor;
	private var bar : Image;

	private var fade : boolean;
	private var disappear : boolean;
	private var followThis : Transform;

	private function Awake(){
		head = GameObject.Find("Head").transform;
		interactor = head.GetComponent(Interactor);
		bar = transform.GetChild(0).GetChild(0).GetComponent(Image);

		//Destroy last ring if it is present
		if(GameObject.Find("CurLoadRing"))
			Destroy(GameObject.Find("CurLoadRing"));

		name = "CurLoadRing";
	}

	public function Update(){
		if(followThis != null)
			transform.position = followThis.position;
		
		//Look at the player
		transform.LookAt(head);

		if(fade){
			if(disappear){
				Disappear();
			}else{
				Fade();
			}
		}else{
			UpdateProgress();
		}
	}

	public function SetObject(obj : Transform) : void{
		followThis = obj;
	}

	private function UpdateProgress() : void{
		var prog : float = interactor.GetProgress();

		bar.fillAmount = prog;

		if(bar.fillAmount >= 1){
			fade = true;
		}
	}

	private function Fade() : void{
		print("fade");

		var red : float = bar.color.r;
		var green : float = bar.color.g;
		var blue : float = bar.color.b;

		if(red < 1.25)
			red += Time.deltaTime * 2.5;

		if(green < 1.25)
			green += Time.deltaTime * 2.5;

		if(blue < 1.25)
			blue += Time.deltaTime * 2.5;

		bar.color = new Color(red, green, blue, 1);

		if(blue >= 1.25 && green >= 1.25 && red >= 1.25)
			disappear = true;
	}

	private function Disappear() : void{
		bar.color.a -= Time.deltaTime;

		if(bar.color.a <= 0){
			Destroy(gameObject);
		}
	}
}