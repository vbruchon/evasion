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
};

export const FaqPageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
}: FaqPageCtaProps) => (
  <PageCta
    background={<PageCtaBackground imageUrl={FAQ_PAGE_DEFAULT_CTA_IMAGE} />}
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
