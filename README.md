<a name="readme-top"></a>


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![BSD-3-Clause license][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CzerwoniakPlus/api">
    <img src="https://lydia.czerwoniakplus.pl/assets/CzerwoniakPlus/CzerwoniakPlus-circle.png"  alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CzerwoniakPlus API</h3>

  <p align="center">
    🌊 A fresh look on original CzerwoniakPlus's API, using TypeScript and ExpressJS
    <br />
    <br />
    <a href="https://czerwoniakplus.pl">Open CzerwoniakPlus in browser</a>
    ·
    <a href="https://github.com/CzerwoniakPlus/api/issues">Report a bug</a>
    ·
    <a href="https://github.com/CzerwoniakPlus/api/issues">Request a feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This repository contains the newest version on CzerwoniakPlus's API. It is a completly fresh look on what we have done with the old (private and archived) one.
Unfortunately, due to signed contracts, we will be unable to share some parts of the project, e.g. the online school register integration. Besides that, 
we are more than happy to accept any feedback from you!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built with

* [![Node][Node.js]][Node-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![ExpressJS][ExpressJS]][ExpressJS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure to use Node.js version of at least v16.15.0 and install newest versions of:
* npm
  ```sh
  npm install npm@latest -g
  ```
* yarn
  ```sh
  npm install yarn@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CzerwoniakPlus/CzerwoniakPlus.git
   ```
2. Install required packages
   ```sh
   yarn install
   ```
3. Copy `.env.example` file and rename it as `.env`. Replace values with necessary data
   ```env
   firebase_db_url = FIREBASE_DB_URL_HERE
   ```
4. Create a `config` directory in the root of project.
   * Make two subdirectories named: `firebase` and `keys`
5. Generate and put your key and certificate PEMs in `keys` directory
6. Generate and put your `serviceAccount.json` in `firebase` directory

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the BSD-3-Clause license. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mateusz Tatko - [@mtatko](https://linkedin.com/in/mtatko) - mtatko@mtatko.dev

Project Link: [https://github.com/CzerwoniakPlus/api](https://github.com/CzerwoniakPlus/api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/CzerwoniakPlus/api.svg?style=for-the-badge
[contributors-url]: https://github.com/CzerwoniakPlus/api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CzerwoniakPlus/api.svg?style=for-the-badge
[forks-url]: https://github.com/CzerwoniakPlus/api/network/members
[stars-shield]: https://img.shields.io/github/stars/CzerwoniakPlus/api.svg?style=for-the-badge
[stars-url]: https://github.com/CzerwoniakPlus/api/stargazers
[issues-shield]: https://img.shields.io/github/issues/CzerwoniakPlus/api.svg?style=for-the-badge
[issues-url]: https://github.com/CzerwoniakPlus/api/issues
[license-shield]: https://img.shields.io/github/license/CzerwoniakPlus/api.svg?style=for-the-badge
[license-url]: https://github.com/CzerwoniakPlus/api/blob/master/LICENSE
[product-screenshot]: https://lydia.czerwoniakplus.pl/assets/CzerwoniakPlus/CzerwoniakPlus-Web-Mockup.png
<!---->
[Node.js]: https://img.shields.io/badge/-Node.js-333333?style=for-the-badge&logo=node.js
[Node-url]: https://nodejs.org/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ExpressJS]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[ExpressJS-url]: https://expressjs.com/
