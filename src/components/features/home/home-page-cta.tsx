import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import { HOME_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/home/home-page-defaults";

type HomePageCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;
};

export const HomePageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
}: HomePageCtaProps) => (
  <PageCta
    background={
      <PageCtaBackground imageUrl={imageUrl ?? HOME_PAGE_DEFAULT_CTA_IMAGE} />
    }
  >
    <PageCtaContent
      eyebrow={eyebrow}
      title={title}
      description={description}
      buttonLabel={buttonLabel}
      buttonHref="/logements"
    />
  </PageCta>
);
