#pragma strict

public class Information extends MonoBehaviour{

	private var head : Transform;

	public function Awake() : void{
		head = GameObject.Find("Head").transform;
	}

	public function SetSprite(imgName : String) : void{
		var img : Image = GameObject.Find("Image").GetComponent(Image);
		var filePath : String = imgName;

		filePath = "highRes/"+imgName;
		print(filePath);
		var hiResSprite : Sprite = Resources.Load(filePath, Sprite) as Sprite;

		img.sprite = hiResSprite;
	}

	public function LateUpdate() : void{
		transform.LookAt(head);

		var dist : float;

		dist = Vector3.Distance(transform.GetChild(0).position, head.position);

		if(transform.position.y > head.position.y){
			transform.position.y -= Time.deltaTime;
		}else if(transform.position.y < head.position.y - 0.1f){
			transform.position.y += Time.deltaTime;
		}

		if(dist > 4.1f){
			transform.GetChild(0).localPosition.z +=  Time.deltaTime;
		}else if (dist < 4){
			transform.GetChild(0).localPosition.z -=  Time.deltaTime;
		}
	}

	public function DestroySelf() : void{
		Destroy(gameObject);
	}
}