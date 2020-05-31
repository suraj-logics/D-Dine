import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {
  height = window.innerHeight-153;
  Restaurants: any = [
    {
      "id": 1,
      "name": "Guru Kripa",
      "neighborhood": "Manhattan",
      "photograph": "https://media.gettyimages.com/photos/authentic-indian-food-picture-id639389404?s=612x612",
      "address": "171 E Broadway, New York, NY 10002",
    },
    {
      "id": 1,
      "name": "Balaji nashta center",
      "neighborhood": "Manhattan",
      "photograph": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvCMPVPvX9tVFmH-oN_Sq5zAuitp7WTKDaGuxrRd7Bcfs-JVCB&usqp=CAU",
      "address": "171 E Broadway, New York, NY 10002",
    },
    {
      "id": 1,
      "name": "Ganesh Swalpahar",
      "neighborhood": "Manhattan",
      "photograph": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDx8p7FmKFTGlT5KVenFYKQ80xRMPN9k8pRmlEBZ_7tNMlKyIg&usqp=CAU",
      "address": "171 E Broadway, New York, NY 10002",
    },
    {
      "id": 1,
      "name": "Vrindavan Foods",
      "neighborhood": "Manhattan",
      "photograph": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOH-eNSw0x2PnCpazactoPcdc1Lps6uB1zOMVT0V8w7hmvaXQI&usqp=CAU",
      "address": "171 E Broadway, New York, NY 10002",
    },
    {
      "id": 1,
      "name": "Kailash Food",
      "neighborhood": "Manhattan",
      "photograph": "https://0f14676b303fd91881eb-98dd17e178263eba3c55ca6434a72b9d.ssl.cf5.rackcdn.com/img/longform_content_images/hearthealthyfoods21.jpg",
      "address": "171 E Broadway, New York, NY 10002",
    },
    {
      "id": 1,
      "name": "vijay shri",
      "neighborhood": "Manhattan",
      "photograph": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOH-eNSw0x2PnCpazactoPcdc1Lps6uB1zOMVT0V8w7hmvaXQI&usqp=CAU",
      "address": "171 E Broadway, New York, NY 10002",
    }
  ]
  constructor() {
    console.log(window.innerHeight)
  }

  ngOnInit() {
  }

  test() {

  }
}
