<?php

namespace App\Listeners;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Validated;
use Illuminate\Auth\Events\Attempting;
use Illuminate\Contracts\Config\Repository;
use DarkGhostHunter\Laraguard\Contracts\TwoFactorListener;
use DarkGhostHunter\Laraguard\Contracts\TwoFactorAuthenticatable;
use DarkGhostHunter\Laraguard\Listeners\ChecksTwoFactorCode;

class EnforceTwoFactorAuth implements TwoFactorListener
{
    use ChecksTwoFactorCode;

    /**
     * Config repository.
     *
     * @var \Illuminate\Contracts\Config\Repository
     */
    protected $config;

    /**
     * Current Request being handled.
     *
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * Input name to verify Two Factor Code presence.
     *
     * @var string
     */
    protected $input;

    /**
     * Credentials used for Login in.
     *
     * @var array
     */
    protected $credentials;

    /**
     * If the user should be remembered.
     *
     * @var bool
     */
    protected $remember;

    /**
     * Create a new Subscriber instance.
     *
     * @param  \Illuminate\Contracts\Config\Repository  $config
     * @param  \Illuminate\Http\Request  $request
     */
    public function __construct(Repository $config, Request $request)
    {
        $this->config = $config;
        $this->request = $request;
        $this->input = $config['laraguard.input'];
    }

    /**
     * Saves the credentials temporarily into the class instance.
     *
     * @param  \Illuminate\Auth\Events\Attempting  $event
     * @return void
     */
    public function saveCredentials(Attempting $event)
    {
        $this->credentials = (array) $event->credentials;
        $this->remember = (bool) $event->remember;
    }

    /**
     * Checks if the user should use Two Factor Auth.
     *
     * @param  \Illuminate\Auth\Events\Validated  $event
     * @return void
     */
    public function checkTwoFactor(Validated $event)
    {
        if ($this->shouldUseTwoFactorAuth($event->user)) {

            if ($this->isSafeDevice($event->user) || ($this->hasCode() && $invalid = $this->hasValidCode($event->user))) {
                return $this->addSafeDevice($event->user);
            }

            $this->throwResponse($event->user, isset($invalid));
        }
    }

    /**
     * Creates a response containing the Two Factor Authentication view.
     *
     * @param  \DarkGhostHunter\Laraguard\Contracts\TwoFactorAuthenticatable  $user
     * @param  bool  $error
     * @return void
     */
    protected function throwResponse(TwoFactorAuthenticatable $user, bool $error = false)
    {
        return response()->json([
            'status' => 'error',
            'message' => $error ? 'The 2FA code is invalid or has expired.' : 'This actions requires 2FA',
            // 'data' => [
            //     'credentials' => $this->credentials,
            //     'error'       => $error,
            //     'remember'    => $this->remember,
            //     'input'       => $this->input,
            // ]
        ], $error ? 422 : 403)->throwResponse();
    }
}
