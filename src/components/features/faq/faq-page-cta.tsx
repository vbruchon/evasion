import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import { FAQ_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/faq/faq-page-defaults";

type FaqPageCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;
};

export const FaqPageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
}: FaqPageCtaProps) => (
  <PageCta
    background={
      <PageCtaBackground imageUrl={imageUrl ?? FAQ_PAGE_DEFAULT_CTA_IMAGE} />
    }
  >
    <PageCtaContent
      eyebrow={eyebrow}
      title={title}
      description={description}
      buttonLabel={buttonLabel}
      buttonHref="/contact"
    />
  </PageCta>
);
