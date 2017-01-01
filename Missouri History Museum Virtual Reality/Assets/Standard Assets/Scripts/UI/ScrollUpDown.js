#pragma strict

public class ScrollUpDown extends MonoBehaviour{
	private var rect : RectTransform;

	private var upLimit : float;
	private var loLimit : float;

	private var pn : int;
	private var stopAt : float;

	private var scroll : boolean;

	private function Awake() : void{
		rect = GetComponent(RectTransform);
		loLimit = rect.anchoredPosition.y;
		upLimit = rect.anchoredPosition.y + 705;
	}

	public function LateUpdate() : void {
		if(Input.GetKeyDown(KeyCode.P))
			print(rect.anchoredPosition.y);

		if(!scroll)
			return;

		SmoothScroll();
	}

	public function Home() : void {
		rect.anchoredPosition.y = loLimit;
	}

	public function Up() : void {
		pn = -1;
		stopAt -= 64;
		scroll = true;
	}

	public function Down() : void{
		pn = 1;
		stopAt += 64;
		scroll = true;
	}

	private function SmoothScroll() : void{
		//Get the current yPosition on the rectTransform's anchoredPosition
		var yPos : float = rect.anchoredPosition.y;

		//calculate how far we need to move up this frame.
		yPos += 64 * Time.deltaTime * pn;

		//if we're  moving up
		if(pn == 1){
			//make sure that our yPos is less than the yPos
			if(yPos > stopAt || yPos > upLimit){
				scroll = false;
				return;
			}
		//if we're moving down
		}else{
			//make sure that our yPos is more than the yPos
			if(yPos < stopAt || yPos < loLimit){
				scroll = false;
				return;
			}
		}
		//^^In either case, if we go past where we should stopAt, then we return and make scroll false^^

		//If we haven't returned yet, the we'll apply the yPos we calculated earlier
		rect.anchoredPosition.y = yPos;
	}
}