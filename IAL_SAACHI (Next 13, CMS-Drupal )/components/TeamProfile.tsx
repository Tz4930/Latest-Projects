import React from 'react'

const TeamProfile = (props) => {
    const{profileData}=props;
  return (
    <>
    <section className="people-items-container">
          <ul>
            <li
              className="people-item"
              data-title="Nida Haider - Managing Partner"
              data-description="Nida began her career in 1999 and over the course of the last few decades has worked at top agencies like Young & Rubicam in New York City and Goodby, Silverstein and Partners in San Francisco. In her time in advertising Nida has had the unique pleasure of assuming multiple roles across the agency spectrum from Client Services to Copywriting to Strategy. This has given her valuable perspective for effectively managing the agency.  Nida joined IAL, Saatchi & Saatchi as Head of Brand Strategy in 2010 and within a year, she and her team brought home the first ever major international award won from Pakistan: the Communication Arts Advertising award for a print ad raising awareness for acid attack victims. This ad was also shortlisted for a Clio, another first for Pakistan. Additionally, she has developed effective brand strategies for over fifty clients from various categories ranging from FMCG to automotive, telecom to consumer appliances.<br>Her passions are her daughter, her morning coffee and trying to make sense of Millennials
"
              data-person-name="Nida Haider "
            >
              <div className="inner">
                <img
                alt='Nida Haider '
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${profileData.field_profile_image.uri.url}`}
                  className="img-responsive center-block"
                />
                <div className="caption">
                  <h3>{profileData.field_profile_name.value}</h3>
                </div>
              </div>
            </li>
          </ul>
        </section>
    </>
  )
}

export default TeamProfile