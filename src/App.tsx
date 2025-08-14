import React, { useState, useEffect } from 'react';
import './App.css';
import PhotoGallery from './components/PhotoGallery';
import Header from './components/Header';
import LoveChat from './components/LoveChat';
import LoveMusic from './components/LoveMusic';

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all image files from the public/images directory
    const getImageFiles = () => {
      const allImages = [
        '1415b252-8d06-467a-8885-af8c040896c2.jpg',
        '20240214_225954.jpg',
        '20240214_230000.jpg',
        '20240214_230003.jpg',
        '20240214_230006.jpg',
        '20240626_235128.jpg',
        '20240626_235141.jpg',
        '20240626_235143.jpg',
        '20240626_235149.jpg',
        '20240626_235201.jpg',
        '20240626_235208.jpg',
        '20240626_235211.jpg',
        '20240626_235218.jpg',
        '20240626_235244.jpg',
        '20240626_235253.jpg',
        '20240626_235400.jpg',
        '20240705_171409.jpg',
        '20240910_002912.jpg',
        '20240910_002916.jpg',
        '20240910_002923.jpg',
        '20240929_210100.jpg',
        '20240929_222725.jpg',
        '20240929_222727.jpg',
        '20240929_222750.jpg',
        '20240929_222800.jpg',
        '20240929_222821.jpg',
        '20240929_222823.jpg',
        '20240929_222831.jpg',
        '20240929_222834.jpg',
        '20240930_010047.jpg',
        '20240930_010056.jpg',
        '20240930_010110.jpg',
        '20240930_010124.jpg',
        '20240930_010126.jpg',
        '20240930_010142(0).jpg',
        '20240930_010142.jpg',
        '20250107_213652.jpg',
        '20250201_205703.jpg',
        '20250201_205705.jpg',
        '20250201_205711.jpg',
        '20250201_205712.jpg',
        '20250221_195551.jpg',
        '20250317_000340.jpg',
        '20250317_000349.jpg',
        '20250317_000351.jpg',
        '20250317_000353.jpg',
        '20250502_183003.jpg',
        '20250502_183011.jpg',
        '325870300_6261869537179406_798072406937884858_n.jpg',
        '327527770_153602184142091_7297615044444970046_n.jpg',
        '327867239_212774941143479_2740419850960427865_n.jpg',
        '328541577_505323578316325_2982675107648431799_n.jpg',
        '329802661_1544378192714463_9040377162071006711_n.jpg',
        '330035360_269935728696329_6834309401697021067_n.jpg',
        '334082441_606562870905822_5967779124967919862_n.jpg',
        '334445696_1710498699404715_4909717079288643507_n.jpg',
        '336490065_1332124564317129_6262756684982549838_n.jpg',
        '343308769_481877360746924_935673241633978287_n.jpg',
        '344339427_1297349757552295_58888101125090344_n.jpg',
        '345449856_1231666640808527_5382350794186788575_n.jpg',
        '350087841_216632434503862_1697958238499846050_n.jpg',
        '352256408_638218371207953_5638105042619137944_n.jpg',
        '353537514_928392378393659_3661373618902652382_n.jpg',
        '354051301_1355598502004061_801956167984974875_n.jpg',
        '354135240_756687092865747_1834945925755573851_n.jpg',
        '355201881_837192894666581_517683251500297464_n.jpg',
        '355653883_6784767848200433_3730275008181593295_n.jpg',
        '357632919_1002577680935787_2982353434664166392_n.jpg',
        '358941287_952865459372012_8712045549955356173_n.jpg',
        '364289599_628680762705511_3959344667609945534_n.jpg',
        '384577465_1719985415146948_888188766988463632_n.jpg',
        '387265784_1058270775589598_5328277975237086181_n.jpg',
        '391384450_799836168559637_1477424477298350951_n.jpg',
        '404053674_1484312588809558_8734809402786261171_n.jpg',
        '407769010_318712917675846_3545879861028693333_n.jpg',
        '409688320_2310900225770837_3843454906177122816_n.jpg',
        '413282286_1708868852957490_7314037991564217740_n.jpg',
        '414228115_1799410103832647_9101162240937606107_n.jpg',
        '418816446_2875160465994947_2315232679192843998_n.jpg',
        '419025815_859263335889966_4432371720367300787_n.jpg',
        '7302f013-abb3-4e96-8602-9ac0990d61fb.jpg',
        'DSC00186.JPG',
        'IMG_20240628_212133_382.jpg',
        'IMG_20240907_223107_207.jpg',
        'IMG_20240908_160053_147.jpg',
        'Messenger_creation_07B7D7FC-12CD-4A95-8657-F73A6F036958.jpeg',
        'Messenger_creation_1501707500563794.jpeg',
        'Messenger_creation_1532704747579038.jpeg',
        'Messenger_creation_158753387295547.jpeg',
        'Messenger_creation_22dda748-5f78-4620-aa2a-d7747c725873.jpeg',
        'Messenger_creation_255284804293916.jpeg',
        'Messenger_creation_25b33aa5-5a3e-495d-99ad-25a6d0c6f2dc.jpeg',
        'Messenger_creation_27B03414-4294-4E13-8892-8D505078F30D.jpeg',
        'Messenger_creation_282959458088972.jpeg',
        'Messenger_creation_303260248840159.jpeg',
        'Messenger_creation_321742827501035.jpeg',
        'Messenger_creation_325895810323950.jpeg',
        'Messenger_creation_346191438142677.jpeg',
        'Messenger_creation_351574027372510.jpeg',
        'Messenger_creation_3697516483904075.jpeg',
        'Messenger_creation_3774398889503778.jpeg',
        'Messenger_creation_378983987889117.jpeg',
        'Messenger_creation_380333387735209.jpeg',
        'Messenger_creation_384620217374589.jpeg',
        'Messenger_creation_5f143f57-b5de-44a3-b1ec-440479c42d71.jpeg',
        'Messenger_creation_61CCCB63-8896-4CB3-8954-D088FC6A8883.jpeg',
        'Messenger_creation_61D0B705-9037-4C03-B151-9726AAE92EC2.jpeg',
        'Messenger_creation_6261BA1F-EE9D-41C1-8E16-63818A2CC606.jpeg',
        'Messenger_creation_638949744982174.jpeg',
        'Messenger_creation_715607374086137.jpeg',
        'Messenger_creation_759610382866625.jpeg',
        'Messenger_creation_766023895339814.jpeg',
        'Messenger_creation_829952f1-5ba0-40a4-a1fd-ef5f5a927efc.jpeg',
        'Messenger_creation_858318779420397.jpeg',
        'Messenger_creation_863883035287609.jpeg',
        'Messenger_creation_880299223754861.jpeg',
        'Messenger_creation_889336195709536.jpeg',
        'Messenger_creation_892571258875255.jpeg',
        'Messenger_creation_898e2b5d-6199-4aab-bd39-69411af6cb10.jpeg',
        'Messenger_creation_914386700231659.jpeg',
        'Messenger_creation_917034023107237.jpeg',
        'Messenger_creation_931505271658166.jpeg',
        'Messenger_creation_AE0DDE13-341F-42D1-9C72-E26D19B139BF.jpeg',
        'Messenger_creation_c4bafcd0-50f4-4973-80e9-4874735939eb.jpeg',
        'Messenger_creation_C7AAADEA-CEA0-491C-BD4F-41D6C704C2FE.jpeg',
        'Messenger_creation_D7411997-86D2-464C-8463-94CE7D19B346.jpeg',
        'Messenger_creation_E9060296-4ABB-4F8A-A11B-AE4F1EEB68D0.jpeg',
        'Messenger_creation_F60F6352-F85B-418F-8C0B-3A997A48718E.jpeg',
        'received_1060504635233159.jpeg',
        'received_1126630812083676.jpeg',
        'received_1532704747579038.jpeg',
        'received_255284804293916.jpeg',
        'received_3774398889503778.jpeg',
        'received_715607374086137.jpeg',
        'received_760141652706696.jpeg',
        'received_894573895750276.jpeg',
        'Screenshot_20240925_180912_Instagram.jpg',
        'Screenshot_20240930_090408_Instagram.jpg',
        'Screenshot_20241005_001021_Instagram.jpg',
        'Screenshot_20250425_170943_Instagram.jpg'
      ];
      
      return allImages.map(image => `/images/${image}`);
    };

    const imageUrls = getImageFiles();
    console.log('Loading images:', imageUrls.length);
    setImages(imageUrls);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-hearts">
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
        </div>
        <p>Loading our beautiful memories...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <PhotoGallery images={images} />
      <LoveChat />
      <LoveMusic />
    </div>
  );
}

export default App;
