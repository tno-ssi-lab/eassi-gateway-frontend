import jolocomImageUrl from '@/assets/connector-jolocom-logo.svg';
import irmaImageUrl from '@/assets/connector-irma-logo.svg';
import indyImageUrl from '@/assets/connector-indy-logo.png';
import idaImageUrl from '@/assets/connector-ida-logo.png';
import trinsicImageUrl from '@/assets/connector-trinsic-logo.jpg';

export const CONNECTORS = [
  {
    name: "jolocom",
    title: "Jolocom",
    walletProviderUrl: "https://jolocom.io/",
    imageUrl: jolocomImageUrl,
    appleDownloadUrl:
      "https://apps.apple.com/us/app/jolocom-smartwallet/id1223869062",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=com.jolocomwallet",
  },
  {
    name: "irma",
    title: "IRMA",
    walletProviderUrl: "https://irma.app/",
    imageUrl: irmaImageUrl,
    appleDownloadUrl:
      "https://apps.apple.com/nl/app/irma-authenticatie/id1294092994",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=org.irmacard.cardemu",
  },
  {
    name: "indy",
    title: "Esatus",
    walletProviderUrl: "https://esatus.com/",
    imageUrl: indyImageUrl,
    appleDownloadUrl:
      "https://apps.apple.com/us/app/esatus-wallet/id1496769057",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=com.esatus.wallet",
  },
  {
    name: "ida",
    title: "Datakeeper",
    walletProviderUrl: "https://rabobank.nl/",
    imageUrl: idaImageUrl,
    appleDownloadUrl:
      "https://apps.apple.com/nl/app/ida/id1546059184",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=nl.rabobank.ida",
  },
  {
    name: "trinsic",
    title: "Trinsic",
    walletProviderUrl: "https://trinsic.id/",
    imageUrl: trinsicImageUrl,
    appleDownloadUrl:
      "https://apps.apple.com/nl/app/trinsic-wallet/id1475160728",
    googleDownloadUrl:
      "https://play.google.com/store/apps/details?id=id.streetcred.apps.mobile",
  },
];
